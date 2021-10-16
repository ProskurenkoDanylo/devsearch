const toggleThemeButton = document.getElementById("toggle-theme");
const findUserButton = document.getElementById("findUserButton");

const setTextToElement = (id, text) => {
  return document.getElementById(id).innerText = text;
}

const toggleTheme = (event) => {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
    event.target.innerHTML = 'Dark  <i class="icon-moon-inv"></i>';
  } else {
    setTheme('theme-dark');
    event.target.innerHTML = 'Light  <i class="icon-sun-filled"></i>';
  }
}

const setTheme = (themeName) => {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

async function fetchUser() {
  let user = document.getElementById('username').value;
  const res = await fetch(`https://api.github.com/users/${user}`);
  return res.json();
}

const displayUserData = () => {
  const data = fetchUser();
  data.then((body) => {
    document.getElementById("user-photo").src = body["avatar_url"] || "public/images/default.png";
    setTextToElement(
        "user-name",
        body["name"] || 'No name'
    );
    setTextToElement(
        "joined",
        body["created_at"] ? `Joined ${new Date(body["created_at"]).toLocaleDateString()}` : ""
    );
    setTextToElement(
        "profile",
        body["bio"] || "No bio."
    )
    setTextToElement(
        "repos-count",
        body["public_repos"] || "0"
    );
    setTextToElement(
        "followers-count",
        body["followers"] || "0"
    );
    setTextToElement("following-count",
        body["following"] || "0"
    );
    setTextToElement(
        "user-location",
        body["location"] || "No location"
    );
    if (body["twitter_username"]) {
      document.getElementById("user-twitter").href = `https://twitter.com/${body["twitter_username"]}`;
    }
    else {
      document.getElementById("user-twitter").removeAttribute('href');
    }
    setTextToElement(
        "user-twitter",
        body["twitter_username"] ? `@${body["twitter_username"]}` : "No twitter"
    );
    if (body["blog"]) {
      document.getElementById("user-blog").href = body["blog"];
    }
    else {
      document.getElementById("user-blog").removeAttribute('href');
    }
    setTextToElement(
        "user-blog",
        body["blog"] || "No blog"
    );
    setTextToElement(
        "user-company",
        body["company"] || "No company"
    );
  })
}

(function () {
  setTheme('theme-light');
  toggleThemeButton.addEventListener("click", toggleTheme, false);
  findUserButton.addEventListener("click", displayUserData, false);
})();
