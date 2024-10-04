// // const apikey = "d60ae28a6508443db9b67f80db60f417"
// const blogdata = document.querySelector(".grid")

// async function fetchrandomnews(){
//     try {
//         const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=d60ae28a6508443db9b67f80db60f417`;
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         console.log(data);
//         return data.articles;
        
//     } catch (error) {
//         console.error("Error Fetching random news",error)
//         return[]
        
//     }
// }

// function displayblog(articles){
//     blogdata.innerHTML = "";
//     articles.forEach((article) => {
//         const blog= document.createElement('div')
//         blog.classList.add("bg-white rounded-lg shadow-md overflow-hidden")    
//         const img = document.createElement("img")
//         img.classList.add("w-full h-40 object-cover")
//         img.src = article.urlToImage
//         img.alt = ""
//         const title = document.createElement("h3")
//         title.classList.add("text-lg font-semibold p-4")
//         title.textContent = article.title
//         const para = document.createElement("p")
//         para.classList.add("text-gray-600 mt-2 p-4")
//         para.textContent = article.description


//         blog.appendChild(img)
//         blog.appendChild(title)
//         blog.appendChild(para)
//         blogdata.appendChild(blog)
//     })
// }


// (async ()=>{
//     try {
//         const news = await fetchrandomnews()
//         displayblog(news)
        
//     } catch (error) {
//         console.error("error in fetching api",error)
//         return []
//     }
// })();



const blogdata = document.querySelector(".grid");

async function fetchrandomnews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=d60ae28a6508443db9b67f80db60f417`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles || [];  // If no articles are returned, ensure we return an empty array
        
    } catch (error) {
        console.error("Error Fetching random news", error);
        return [];  // Return an empty array if an error occurs
    }
}

function displayblog(articles) {
    blogdata.innerHTML = "";  // Clear the previous content

    if (articles.length === 0) {
        blogdata.innerHTML = "<p class='text-center text-red-500'>No news articles found.</p>";  // Display a message if no articles
        return;
    }

    articles.forEach((article) => {
        const blog = document.createElement('div');
        blog.classList.add("bg-white", "rounded-lg", "shadow-md", "overflow-hidden");

        const img = document.createElement("img");
        img.classList.add("w-full", "h-40", "object-cover");
        img.src = article.urlToImage || "https://via.placeholder.com/150";  // Fallback image if no image provided
        img.alt = article.title || "News Image";

        const title = document.createElement("h3");
        title.classList.add("text-lg", "font-semibold", "p-4");
        title.textContent = article.title || "No title available";  // Fallback for missing title

        const para = document.createElement("p");
        para.classList.add("text-gray-600", "mt-2", "p-4");
        para.textContent = article.description || "No description available";  // Fallback for missing description

        blog.appendChild(img);
        blog.appendChild(title);
        blog.appendChild(para);
        blogdata.appendChild(blog);
    });
}

(async () => {
    try {
        const news = await fetchrandomnews();
        displayblog(news);
    } catch (error) {
        console.error("Error in fetching API", error);
        blogdata.innerHTML = "<p class='text-center text-red-500'>Failed to load news articles. Please try again later.</p>";  // Error message in the UI
    }
})();
