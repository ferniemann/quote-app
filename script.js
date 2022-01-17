const url = new URL(window.location.href);
let currentPage = Number(url.searchParams.get("p")) || 1;

function renderQuotes(quotes) {
    const quoteOutput = document.querySelector("#quotes");
    const allQuotes = quotes.data;

    quoteOutput.innerText = "";

    allQuotes.forEach((quote) => {
        const quoteWrapper = document.createElement("figure");
        const quoteItem = document.createElement("blockquote");
        quoteItem.innerText = quote.quoteText;

        const authorWrapper = document.createElement("figcaption");
        const authorItem = document.createElement("p");
        authorItem.innerText = quote.quoteAuthor;

        authorWrapper.append(authorItem);
        quoteWrapper.append(quoteItem, authorWrapper);
        quoteOutput.append(quoteWrapper);
    });
}

function getQuoteData(page) {
    fetch("https://quote-garden.herokuapp.com/api/v3/quotes?page=" + page)
        .then((res) => res.json())
        .then((data) => {
            renderQuotes(data);
            renderPagination(data);
            url.searchParams.get("p");
            url.searchParams.set("p", page);
            if (window.location.href !== url.href) {
                window.location.href = url;
            }
        });
}

function renderPagination(data) {
    const paginationArea = document.querySelector("#pagination");

    const threeBack = currentPage - 3;
    const twoBack = currentPage - 2;
    const oneBack = currentPage - 1;
    const oneForward = currentPage + 1;
    const twoForward = currentPage + 2;
    const threeForward = currentPage + 3;
    const lastPage = data.pagination.totalPages;

    paginationArea.innerText = "";

    if (currentPage > 4) {
        const jumpToStart = document.createElement("button");
        jumpToStart.innerText = 1;
        const dots = document.createElement("p");
        dots.innerText = "...";
        paginationArea.append(jumpToStart, dots);
    }

    if (currentPage > 3) {
        const jumpThreeBack = document.createElement("button");
        jumpThreeBack.innerText = threeBack;
        paginationArea.append(jumpThreeBack);
    }

    if (currentPage > 2) {
        const jumpTwoBack = document.createElement("button");
        jumpTwoBack.innerText = twoBack;
        paginationArea.append(jumpTwoBack);
    }

    if (currentPage > 1) {
        const jumpOneBack = document.createElement("button");
        jumpOneBack.innerText = oneBack;
        paginationArea.append(jumpOneBack);
    }

    const current = document.createElement("button");
    current.innerText = currentPage;
    current.disabled = true;

    paginationArea.append(current);

    if (currentPage < lastPage) {
        const jumpOneForward = document.createElement("button");
        jumpOneForward.innerText = oneForward;
        paginationArea.append(jumpOneForward);
    }

    if (currentPage < lastPage - 1) {
        const jumpTwoForward = document.createElement("button");
        jumpTwoForward.innerText = twoForward;
        paginationArea.append(jumpTwoForward);
    }

    if (currentPage < lastPage - 2) {
        const jumpThreeForward = document.createElement("button");
        jumpThreeForward.innerText = threeForward;
        paginationArea.append(jumpThreeForward);
    }

    if (currentPage < lastPage - 3) {
        const jumpToEnd = document.createElement("button");
        jumpToEnd.innerText = lastPage;
        const dots = document.createElement("p");
        dots.innerText = "...";

        paginationArea.append(dots, jumpToEnd);
    }

    const allButtons = paginationArea.querySelectorAll("button");
    allButtons.forEach((button) => {
        button.addEventListener("click", function () {
            currentPage = Number(button.innerText);
            getQuoteData(currentPage);
        });
    });
}

getQuoteData(currentPage);
