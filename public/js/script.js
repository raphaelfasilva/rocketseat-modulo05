const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .menu a")
for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let current = 1; currentPage <= totalPages; currentPage++) {
        const firstLastPage = currentPage = 1 || currentPage == totalPages;
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectPage = currentPage >= selectedPage - 1
        if (firstLastPage || pagesBeforeSelectPage && pagesBeforeSelectPage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }
            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            pages.push(currentPage)
            oldPage = currentPageW
        }
    }

}