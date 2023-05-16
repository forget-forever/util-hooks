# util-hooks

a library for some react hooks

## docs

### polling hook

```typescript

import { useInertval } from 'util-hooks'

useInertval(async () => {
  if (xxx) {
    const res = await getData()
    if (loadOk(res.status)) {
      /** return `false` or `Promise.reject` will stop polling */
      /** 返回 `false` 或者 `Promise.reject` 将会停止下一次轮询 */
      return false
    }
  }
  return true
}, 3000)

useInertval(async () => {
    const res = await getData()
    if (loadOk(res.status)) {
      /** return `false` or `Promise.reject` will stop polling */
      /** 返回 `false` 或者 `Promise.reject` 将会停止下一次轮询 */
      return false
    }
  /** return a number will telling the next poling delay */
  /** 返回一个数字将会是下一个轮询的延迟时间 */
  return 1000
}, 3000)


```
