export function useReveal() {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      }
    }, { threshold: 0.16 })

    document.querySelectorAll('.reveal').forEach((element) => observer?.observe(element))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
