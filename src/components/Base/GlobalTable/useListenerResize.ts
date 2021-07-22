export default function userListenerResize() {
  function listenerResize() {
    window.addEventListener('resize', listenerResize)
  }

  return {
    listenerResize
  }
}
