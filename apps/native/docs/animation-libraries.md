# Animation & Gesture Libraries — Grow Project

> A practical guide to understanding and choosing between the four animation/gesture libraries used in this project.

---

## Overview

This project uses four complementary libraries that cover different layers of the animation and interaction stack. They are **not** interchangeable — each has a specific purpose and a specific cost (complexity, bundle size, performance characteristics). Understanding when to reach for each one is essential.

```
react-native-worklets        ← The engine layer (multi-threading primitives)
         ↓
react-native-reanimated 4   ← The power layer (complex, JS-driven animations on the UI thread)
         ↓
react-native-gesture-handler ← The input layer (native gesture recognition)
         ↓
react-native-ease            ← The convenience layer (simple declarative animations, zero overhead)
```

> **TL;DR Rule of Thumb**
> - Something bouncing, fading, sliding on a button press? → **react-native-ease**
> - Gesture-driven pan/pinch/swipe animations? → **Reanimated + Gesture Handler**
> - Shared element transitions between screens? → **Reanimated 4**
> - CPU-heavy background work without blocking the UI? → **Worklets**

---

## Table of Contents

1. [react-native-worklets](#1-react-native-worklets)
2. [react-native-reanimated 4](#2-react-native-reanimated-4)
3. [react-native-gesture-handler](#3-react-native-gesture-handler)
4. [react-native-ease](#4-react-native-ease)
5. [Comparison Table](#5-comparison-table)
6. [When to Use Which](#6-when-to-use-which)
7. [How They Work Together](#7-how-they-work-together)
8. [Patterns Used in This Project](#8-patterns-used-in-this-project)

---

## 1. react-native-worklets

**Role:** Multi-threading engine / Low-level primitive  
**Made by:** Software Mansion  
**New Architecture only:** ✅ Yes (Fabric required)

### What It Is

`react-native-worklets` is the **underlying runtime** that powers Reanimated 4. It extracts the "worklet" concept into a standalone, reusable package. A **worklet** is a JavaScript function annotated with `'worklet';` that gets serialized by a Babel plugin and runs inside an **isolated Hermes VM** — separate from the main JS thread.

It was previously bundled inside Reanimated. As of Reanimated 4, it's a separate package you install explicitly.

### Core Concepts

#### The `'worklet'` Directive
When you annotate a function with `'worklet';`, the Babel plugin serializes it into a form that can be executed on a different JS runtime:

```typescript
const heavyCalc = () => {
  'worklet';
  let result = 0;
  for (let i = 0; i < 10_000_000; i++) {
    result += Math.sqrt(i);
  }
  return result;
};
```

This function now runs on the **UI thread** (or a custom runtime) — not the main JS thread — so it won't freeze your UI.

#### Thread Communication Utilities

| Utility | Purpose |
|---|---|
| `runOnJS(fn)` | Calls `fn` on the main React JS thread from within a worklet |
| `runOnUI(fn)` | Schedules `fn` to run on the UI thread |
| `useSharedValue(v)` | Creates a value readable/writable from any thread safely |
| `createWorkletRuntime(name)` | Creates a custom background Hermes runtime |

#### Example: Background Processing with UI Feedback

```typescript
import { runOnJS, runOnUI } from 'react-native-worklets';
import { useSharedValue } from 'react-native-reanimated';

const progress = useSharedValue(0);

const processData = () => {
  'worklet';
  // CPU intensive work on UI thread
  for (let i = 0; i < 1000000; i++) {
    progress.value = i / 1000000;
  }
};

// Run on the UI thread
runOnUI(processData)();
```

### Setup

```bash
pnpm add react-native-worklets
```

Update `babel.config.js` (replacing the old Reanimated plugin):

```javascript
module.exports = {
  plugins: ['react-native-worklets/plugin'],
};
```

> ⚠️ In Reanimated 4, the Babel plugin moved from `react-native-reanimated/plugin` → `react-native-worklets/plugin`.

### What Worklets Cannot Do

- Access React state (`useState`, context, etc.)
- Call `fetch` or most async APIs
- Access the full React Native environment (only bare Hermes)
- Replace Reanimated for animation orchestration

### When to Use Directly

You rarely use `react-native-worklets` directly. You interact with it through Reanimated and Gesture Handler. Use it directly only when:
- Building your own library on top of the worklet engine
- Offloading custom CPU-intensive work (not animation-related) to a background Hermes VM
- Creating a custom `WorkletRuntime` for persistent background processing

---

## 2. react-native-reanimated 4

**Role:** Complex animations running on the UI thread  
**Made by:** Software Mansion  
**New Architecture only:** ✅ Yes (RN 0.76+)  
**Docs:** https://docs.swmansion.com/react-native-reanimated/

### What It Is

Reanimated is the **gold standard** animation library for React Native. It lets you write animation logic in JavaScript that executes directly on the **UI thread** via worklets — completely bypassing the JS-to-native bridge. This makes animations buttery smooth at 60–120 fps even when the JS thread is busy.

Version 4 is a major overhaul built entirely on top of `react-native-worklets`, adds CSS-like animation APIs, reintroduces shared element transitions, and removes all legacy architecture support.

### Core APIs

#### Shared Values — The Heart of Reanimated

```typescript
import { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const offset = useSharedValue(0);

// Animate it
offset.value = withSpring(200);
offset.value = withTiming(100, { duration: 400 });
```

`useSharedValue` creates a thread-safe reactive value. When it changes, only the animation on the UI thread updates — no re-renders.

#### `useAnimatedStyle` — Attach Animation to Style

```typescript
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

function Box() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[styles.box, animatedStyle]}
      onPress={() => { scale.value = withSpring(1.2); }}
    />
  );
}
```

#### Animation Functions

| Function | Type | Best For |
|---|---|---|
| `withTiming(value, config)` | Timing | Opacity, color transitions |
| `withSpring(value, config)` | Physics | Scale, position, interactive feel |
| `withDecay(config)` | Physics | Flick/momentum scrolling |
| `withRepeat(anim, count)` | Meta | Looping, pulsing |
| `withSequence(...anims)` | Meta | Chained multi-step animations |
| `withDelay(ms, anim)` | Meta | Staggered entrance animations |

#### Layout Animations — Animate Mount/Unmount

```typescript
import Animated, { FadeIn, FadeOut, SlideInRight, ZoomOut } from 'react-native-reanimated';

<Animated.View entering={FadeIn.duration(300)} exiting={SlideInRight.duration(200)}>
  <Text>I animate in and out</Text>
</Animated.View>
```

Over 20 built-in presets: `FadeIn`, `SlideInLeft`, `ZoomIn`, `BounceIn`, `FlipInX`, etc.

#### Shared Element Transitions (v4.2+)

Move a component visually between screens with zero extra code:

```typescript
// Screen A
<Animated.Image sharedTransitionTag="hero-image" source={thumbnail} />

// Screen B
<Animated.Image sharedTransitionTag="hero-image" source={fullImage} />
```

#### CSS-Style Animations (New in v4)

Declare animations in a web-familiar way:

```typescript
const style = useAnimatedStyle(() => ({
  animationName: [{
    from: { opacity: 0, transform: [{ translateY: -20 }] },
    to: { opacity: 1, transform: [{ translateY: 0 }] },
  }],
  animationDuration: '300ms',
  animationEasing: 'ease-out',
}));
```

#### Sensor & Keyboard Hooks

```typescript
// Gyroscope-driven animation
const sensor = useAnimatedSensor(SensorType.GYROSCOPE);

// Keyboard-driven animation (e.g., push content up)
const keyboard = useAnimatedKeyboard();
const style = useAnimatedStyle(() => ({
  transform: [{ translateY: -keyboard.height.value }],
}));
```

### When to Use Reanimated

✅ Gesture-driven animations (pan, swipe to dismiss, drag & drop)  
✅ Complex, multi-step animation sequences  
✅ Shared element transitions between screens  
✅ Layout animations (view entering/exiting)  
✅ Sensor-based or keyboard-reactive animations  
✅ Anything requiring `useAnimatedStyle`, `useSharedValue`  

❌ Don't use for simple triggered animations (button press fade) → use **react-native-ease**

---

## 3. react-native-gesture-handler

**Role:** Native gesture recognition and touch input  
**Made by:** Software Mansion  
**New Architecture only:** ✅ Yes (v3.0+)  
**Docs:** https://docs.swmansion.com/react-native-gesture-handler/

### What It Is

Gesture Handler replaces React Native's built-in touch system (`Gesture Responder System`) with **native gesture recognizers** running directly on the UI thread. The key difference: gestures are processed natively, so they work even when the JS thread is blocked.

Version 3.0 (2026) introduced a completely new **hook-based API** and dropped legacy architecture support.

### Why It Exists

React Native's default touch system runs on the JS thread. If your JS thread is busy (e.g., rendering a large list), touch events are missed or delayed. Gesture Handler fixes this by processing touches natively.

### Core API

#### v3 Hook-Based API (Preferred)

```typescript
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

function DraggableCard() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((event) => {
      x.value = startX.value + event.translationX;
      y.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      x.value = withSpring(0);
      y.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]} />
    </GestureDetector>
  );
}
```

#### Available Gesture Types

| Gesture | Use Case |
|---|---|
| `Gesture.Tap()` | Button taps, double-taps |
| `Gesture.Pan()` | Drag & drop, swipe-to-dismiss |
| `Gesture.Pinch()` | Zoom/scale |
| `Gesture.Rotation()` | Rotate elements |
| `Gesture.Fling()` | Quick flick gestures |
| `Gesture.LongPress()` | Hold-to-reveal menus |
| `Gesture.Native()` | Wraps native recognizers |
| `Gesture.Manual()` | Fully custom state machine |

#### Composing Gestures

```typescript
// Both gestures active simultaneously (e.g., pan + pinch for image viewer)
const composed = Gesture.Simultaneous(panGesture, pinchGesture);

// Only one gesture at a time
const exclusive = Gesture.Exclusive(tapGesture, longPressGesture);

// One gesture waits for another to fail
const sequential = Gesture.Race(singleTap, doubleTap);
```

#### v3 Callback Name Changes

| Old (v2) | New (v3) |
|---|---|
| `onStart` | `onActivate` |
| `onEnd` | `onDeactivate` |

#### SharedValues as Gesture Config (v3+)

```typescript
const minDistance = useSharedValue(10);

// Gesture config reads from shared value — no re-renders needed!
const pan = Gesture.Pan().minDistance(minDistance);
```

### Required Setup

Wrap your root component:

```typescript
// app/_layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* rest of your app */}
    </GestureHandlerRootView>
  );
}
```

### When to Use Gesture Handler

✅ Any user-driven touch interaction beyond simple taps  
✅ Draggable elements, swipe-to-dismiss patterns  
✅ Pinch-to-zoom, rotation  
✅ Gesture conflicts (simultaneous/exclusive composing)  
✅ Always required as the input layer for Reanimated gesture-driven animations  

❌ Don't use for simple `onPress` events → React Native's `Pressable` is fine  
❌ Don't use without Reanimated for gesture-driven animations  

---

## 4. react-native-ease

**Role:** Lightweight declarative animations (zero JS overhead)  
**Made by:** App & Flow  
**New Architecture only:** ✅ Yes (Fabric required)  
**GitHub:** https://github.com/AppAndFlow/react-native-ease

### What It Is

`react-native-ease` is the **simplest and lightest** option. It runs animations entirely on **native platform APIs** — Core Animation (iOS) and Animator/SpringAnimation (Android). There are no JS animation loops, no worklets, no shared values, no C++ runtime.

It wraps the OS's own animation engine with a clean, CSS-transition-like API.

### The EaseView Component

`EaseView` is a drop-in replacement for `View`. Add `animate` and `transition` props and it handles the rest:

```typescript
import { EaseView } from 'react-native-ease';
// Or if using Uniwind:
import { EaseView } from 'react-native-ease/uniwind';

function FadeCard({ visible, children }) {
  return (
    <EaseView
      animate={{ opacity: visible ? 1 : 0, translateY: visible ? 0 : 20 }}
      transition={{ type: 'timing', duration: 300, easing: 'easeOut' }}
      className="flex-1 bg-white rounded-2xl p-4"
    >
      {children}
    </EaseView>
  );
}
```

### Transition Types

#### Timing
```typescript
transition={{ type: 'timing', duration: 300, easing: 'easeOut' }}
```

Easing options: `'linear'` | `'easeIn'` | `'easeOut'` | `'easeInOut'` | `[x1, y1, x2, y2]` (custom cubic-bezier)

#### Spring (Physics-based)
```typescript
transition={{ type: 'spring', damping: 15, stiffness: 120, mass: 1 }}
```

Spring presets:
```typescript
// Snappy (no bounce)
{ type: 'spring', damping: 20, stiffness: 300, mass: 1 }

// Gentle bounce
{ type: 'spring', damping: 12, stiffness: 120, mass: 1 }

// Bouncy
{ type: 'spring', damping: 8, stiffness: 200, mass: 1 }
```

#### None (Instant)
```typescript
transition={{ type: 'none' }} // No animation, immediately apply values
```

### Animatable Properties

| Category | Properties |
|---|---|
| **Transform** | `translateX`, `translateY`, `scale`, `scaleX`, `scaleY`, `rotate` |
| **Opacity** | `opacity` |
| **Border Radius** | `borderRadius` |
| **Background** | `backgroundColor` |
| **Border** | `borderWidth`, `borderColor` |
| **Shadow (iOS)** | `shadowOpacity`, `shadowRadius`, `shadowColor`, `shadowOffset` |
| **Elevation (Android)** | `elevation` |

### Per-Property Transitions

```typescript
<EaseView
  animate={{ opacity: visible ? 1 : 0, translateY: visible ? 0 : 30 }}
  transition={{
    opacity: { type: 'timing', duration: 150, easing: 'easeOut' },
    transform: { type: 'spring', damping: 12, stiffness: 200 },
  }}
/>
```

### Transition Callback

```typescript
<EaseView
  animate={{ opacity: isVisible ? 1 : 0 }}
  transition={{ type: 'timing', duration: 300 }}
  onTransitionEnd={({ finished }) => {
    if (finished) console.log('Animation complete!');
  }}
/>
```

### Uniwind (Tailwind) Integration

This project uses Uniwind. Import `EaseView` from the Uniwind entry point so `className` works:

```typescript
import { EaseView } from 'react-native-ease/uniwind';

<EaseView
  className="flex-1 bg-white rounded-2xl p-4"
  animate={{ opacity: visible ? 1 : 0 }}
  transition={{ type: 'timing', duration: 300 }}
>
  {children}
</EaseView>
```

### What EaseView Cannot Do

- ❌ Gesture-driven animations (no worklets/shared values)
- ❌ Layout animations (`width`/`height` changes)
- ❌ Shared element transitions between screens
- ❌ Sensor/keyboard-driven animations
- ❌ Looping/complex sequenced animations

### When to Use react-native-ease

✅ Simple show/hide animations (modals, toasts, cards)  
✅ Button press feedback (scale, opacity)  
✅ Tab/screen transition effects  
✅ Any animation triggered by a state change (not a gesture position)  
✅ When you want zero animation complexity overhead  
✅ **Default choice for most component-level animations in this project**  

---

## 5. Comparison Table

| Feature | react-native-ease | Reanimated 4 | Gesture Handler | react-native-worklets |
|---|---|---|---|---|
| **Purpose** | Declarative UI animations | Complex animations on UI thread | Native gesture input | Multi-threading engine |
| **Complexity** | ⭐ Very simple | ⭐⭐⭐ Complex | ⭐⭐ Moderate | ⭐⭐⭐ Low-level |
| **Performance** | 🟢 Native APIs, zero JS | 🟢 UI thread via worklets | 🟢 Native thread | 🟢 Isolated Hermes VMs |
| **Bundle Impact** | 🟢 Minimal | 🔴 Significant (C++ runtime) | 🟡 Moderate | 🟡 Moderate |
| **Gesture-driven** | ❌ No | ✅ Yes (with RNGH) | ✅ Yes | ❌ Not directly |
| **Layout animations** | ❌ No | ✅ Yes | ❌ No | ❌ No |
| **Shared element** | ❌ No | ✅ Yes (v4.2+) | ❌ No | ❌ No |
| **Sensor/Keyboard** | ❌ No | ✅ Yes | ❌ No | ❌ No |
| **Spring physics** | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| **New Arch required** | ✅ Yes | ✅ Yes | ✅ Yes (v3) | ✅ Yes |
| **Babel plugin** | ❌ No | via worklets | ❌ No | ✅ Yes |
| **Direct usage in Grow** | ✅ Default choice | Complex interactions | With Reanimated | Indirect (via Reanimated) |

---

## 6. When to Use Which

### Use **react-native-ease** when:
- You need a fade, slide, scale, or color animation triggered by a state change
- The animation is not driven by gesture position
- You want clean, minimal code with no performance overhead
- Examples: modal appear/disappear, card expand, button press, tab transition, toast notifications

```typescript
// ✅ Perfect for react-native-ease
<EaseView
  animate={{ scale: isPressed ? 0.95 : 1, opacity: isPressed ? 0.8 : 1 }}
  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
>
  <Text>Press Me</Text>
</EaseView>
```

### Use **Reanimated 4** when:
- The animation values depend on gesture position (drag distance, velocity)
- You need layout animations (enter/exit animations for components)
- You need shared element transitions between screens
- You're animating something based on scroll position
- You need `useAnimatedStyle` to compute style on the UI thread

```typescript
// ✅ Perfect for Reanimated
const { useSharedValue, useAnimatedStyle, withSpring } = require('react-native-reanimated');

const offset = useSharedValue(0);
const style = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
}));
```

### Use **Gesture Handler** when:
- You need pan, pinch, rotation, fling, or long-press gestures
- You need gesture composing (simultaneous or exclusive)
- Always pair with Reanimated for the animation itself

```typescript
// ✅ Always use Gesture Handler with Reanimated for gesture-driven animation
const pan = Gesture.Pan()
  .onUpdate((e) => { x.value = e.translationX; })
  .onEnd(() => { x.value = withSpring(0); });
```

### Use **react-native-worklets** when:
- You are consuming it indirectly through Reanimated (most common case)
- You need to write a custom function tagged with `'worklet';`
- You're building a library/utility that must run on the UI thread
- Rare: offloading non-animation CPU intensive tasks to a background Hermes runtime

---

## 7. How They Work Together

The four libraries form a layered system:

```
                    Your Component
                         │
          ┌──────────────┼──────────────┐
          │              │              │
   react-native-ease  Gesture       Reanimated
   (simple state      Handler       (complex UI
    animations)       (touch         thread anims)
                      input)              │
                          └──────────────┘
                                 │
                          react-native-worklets
                          (Hermes VMs, 'worklet';
                           runOnUI, runOnJS,
                           SharedValues)
```

### Typical Pattern: Swipe-to-Dismiss Card

```typescript
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

function SwipeCard({ onDismiss }) {
  const translateX = useSharedValue(0);

  // Called from worklet → back on JS thread
  const handleDismiss = () => {
    onDismiss();
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX; // runs on UI thread (worklet)
    })
    .onEnd((e) => {
      if (Math.abs(e.translationX) > 150) {
        translateX.value = withSpring(e.translationX > 0 ? 500 : -500);
        runOnJS(handleDismiss)(); // bridge back to JS to call React callback
      } else {
        translateX.value = withSpring(0);
      }
    });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, style]} />
    </GestureDetector>
  );
}
```

---

## 8. Patterns Used in This Project

### Project Convention

Per `AGENTS.md`, the rule for this project is:

> **Use `react-native-ease` for simple animations. Do NOT use it for gesture-driven and shared element animations.**

This means:

| Animation Type | Library to Use |
|---|---|
| Component mount/unmount fade | `react-native-ease` |
| Button press scale/opacity | `react-native-ease` |
| Modal slide-in | `react-native-ease` |
| Tab bar active indicator | `react-native-ease` |
| Focus timer progress animation | `react-native-ease` |
| Swipe-to-complete task | `Reanimated` + `Gesture Handler` |
| Shared element (e.g., task → detail view) | `Reanimated 4` |
| Heatmap scroll/gesture | `Gesture Handler` + `Reanimated` |
| Parallax/scroll effects | `Reanimated` |

### Uniwind + react-native-ease Setup

```typescript
// Always import EaseView from the Uniwind entry when using className
import { EaseView } from 'react-native-ease/uniwind';

// ✅ Correct — className works
<EaseView className="bg-primary rounded-xl p-4" animate={{ opacity: 1 }} />

// ❌ Wrong — className won't work without /uniwind import
import { EaseView } from 'react-native-ease';
<EaseView className="bg-primary rounded-xl p-4" animate={{ opacity: 1 }} />
```

### GestureHandlerRootView (Required in Layout)

```typescript
// src/app/_layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack />
    </GestureHandlerRootView>
  );
}
```

---

## References

| Library | Official Docs | GitHub | Version |
|---|---|---|---|
| react-native-worklets | [docs.swmansion.com](https://docs.swmansion.com/react-native-worklets/) | [software-mansion/react-native-worklets](https://github.com/software-mansion/react-native-worklets) | Latest |
| react-native-reanimated | [docs.swmansion.com/react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) | [software-mansion/react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) | 4.x |
| react-native-gesture-handler | [docs.swmansion.com/react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) | [software-mansion/react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) | 3.x |
| react-native-ease | — | [AppAndFlow/react-native-ease](https://github.com/AppAndFlow/react-native-ease) | Latest |
