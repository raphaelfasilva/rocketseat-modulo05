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

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstLastPage = currentPage == 1 || currentPage == totalPages;
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
        const pagesBeforeSelectPage = currentPage >= selectedPage - 2;
        if (firstLastPage || pagesBeforeSelectPage && pagesAfterSelectedPage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }
            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            pages.push(currentPage)
            oldPage = currentPage
        }
    }
    return pages

}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const limit = +pagination.dataset.limit
const filter = pagination.dataset.filter
console.log(pagination.dataset.page)
console.log(pagination.dataset.total)
const pages = paginate(page, total)
console.log(pages)
let elements = ""
for (let page of pages) {
    elements += `<a href="/instructors/?page=${page}&limit=${limit}&filter=${filter}">${page}</a>`
}
pagination.innerHTML = elements