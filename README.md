## Description
Space news web application
## About the project
News web application written in react language.
As part of the assignment the API was used

[https://api.spaceflightnewsapi.net/v3/documentation](https://api.spaceflightnewsapi.net/v3/documentation)

Part of the code where the search by title or content, sorting by publication date is implemented.
setSort, setSearchByTitle, setSearchBySummary - methods and variables that store the parameters of the news list obtained from API
```javascript
<div className="main-content-line" style={{marginBottom: 0}}>
    <button id="sort" onClick={() => {
        if (!sort) {
            setSort(true)
        } else {
            setSort(false);
        }
    }}>
        Сортировка
    </button>
    <input placeholder="Поиск" type="text" value={keyWord} onChange={event => {
        setKeyWord(event.target.value)
    }}/>
    <button id="sort" onClick={() => {
        setMode("searchByTitle");
        setSearchByTitle();
    }}>
        Поиск по заголовку
    </button>
    <button id="sort" onClick={() => {
        setMode("searchBySummary");
        setSearchBySummary();
    }}>
        Поиск по содержанию
    </button>
</div>
```

setSearchByTitle, setSearchBySummary - methods in which the search occurs. When clicked, API-request takes place, from which we get the list of news  
keyWord - search value  
sortStr - the variable which defines if the sorted list is needed or not  
newsCount - a variable responsible for the pagination of pages  
setNews - list of received news  
setTotalCount - list used for pagination  
```javascript
const setSearchByTitle = () => {
        const sortStr = sort ? "&_sort=publishedAt" : "";
        axios
            .get(
                "https://api.spaceflightnewsapi.net/v3/articles?title_contains=" + keyWord
                    + sortStr + "&_start=" + newsCount + "&_limit=6"
            )
            .then((res) => {
                setNews(res.data);
            })

        axios
            .get("https://api.spaceflightnewsapi.net/v3/articles/count?title_contains=" + keyWord)
            .then((res) => {
                setTotalCount(res.data);
            })
    }

    const setSearchBySummary = () => {
        const sortStr = sort ? "&_sort=publishedAt" : "";
        axios
            .get(
                "https://api.spaceflightnewsapi.net/v3/articles?summary_contains=" + keyWord
                    + sortStr + "&_start=" + newsCount + "&_limit=6"
            )
            .then((res) => {
                setNews(res.data);
            })

        axios
            .get("https://api.spaceflightnewsapi.net/v3/articles/count?summary_contains=" + keyWord)
            .then((res) => {
                setTotalCount(res.data);
            })
    }
```

The project also includes an adaptive design.
Almost all the basic css styles were written in percent, there are several media css with media queries for screen width < 800px

The project implements news bookmarks, they are saved in local storage
```javascript
useEffect(() => {
        if (localStorage.getItem("bookmarks") !== null) {
            JSON.parse(localStorage.getItem("bookmarks")).includes(Number(id)) ? setIsPinned(true) : setIsPinned(false)
        }
        axios
            .get("https://api.spaceflightnewsapi.net/v3/articles/" + id)
            .then((res) => {
                setArticle(res.data);
            })
    }, [id])

const handleClickAdd = () => {
    if (localStorage.getItem("bookmarks") !== null) {
        temp = JSON.parse(localStorage.getItem("bookmarks"));
    }
    temp.push(Number(id));
    localStorage.setItem("bookmarks", JSON.stringify(temp));
    setIsPinned(true);
}

const handleClickDel = () => {
    temp = JSON.parse(localStorage.getItem("bookmarks"));
    temp.splice(temp.indexOf(Number(id)), 1);
    localStorage.setItem("bookmarks", JSON.stringify(temp));
    setIsPinned(false);
}
```
## Project setup

```
npm install
npm run start
```

## Future scope
1. Refactoring pagination and bookmarks
