;(function navigation () {
  const nav = document.querySelector('nav')

  function isNavItem(node) {
    return node.className.indexOf('nav-item') !== -1
  }

  function scrollTo(section) {
    console.log(section)
  }

  nav.addEventListener('click', function (e) {
    if (!isNavItem(e.target)) return

    const sectionId = e.target.href.replace('/#', '')
    const section = document.getElementById(sectionId)
    scrollTo(section)
  })
})()
