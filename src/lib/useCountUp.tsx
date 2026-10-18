import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "framer-motion"
import { formatNumber } from "@/lib/utils"

export function useCountUp(target: number, duration = 1.1) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target, duration])

  return { ref, value }
}

export function CountUpText({
  value,
  suffix = "",
  className,
}: {
  value: number
  suffix?: string
  className?: string
}) {
  const { ref, value: current } = useCountUp(value)
  return (
    <span ref={ref} className={className}>
      {formatNumber(current)}
      {suffix}
    </span>
  )
}
