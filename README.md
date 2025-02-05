<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Movie Search App</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background: #f4f4f4;
    }
    header {
      background: #333;
      color: #fff;
      padding: 10px 20px;
      text-align: center;
    }
    main {
      max-width: 800px;
      margin: 20px auto;
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    section {
      margin-bottom: 20px;
    }
    h1, h2, h3 {
      color: #333;
    }
    p, ul, li {
      margin: 10px 0;
    }
    code {
      background: #f4f4f4;
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 0.95em;
    }
    pre {
      background: #f4f4f4;
      padding: 10px;
      border-left: 4px solid #ccc;
      overflow-x: auto;
    }
    .note {
      background: #e7f4e7;
      border-left: 4px solid #98c998;
      padding: 10px;
      border-radius: 3px;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <header>
    <h1>Movie Search App</h1>
  </header>
  <main>
    <section>
      <h2>About</h2>
      <p>This is a web-based application that allows users to search for movies, view details, and manage a list of their favorite movies.</p>
    </section>
    <section>
      <h2>Key Features</h2>
      <ul>
        <li><strong>Search for Movies:</strong> Users can type in a movie title, and the app will display a list of matching results.</li>
        <li><strong>Add to Favorites:</strong> Users can mark movies as favorites and easily view or remove them from their favorites list.</li>
        <li><strong>Simple Sorting:</strong> Results can be sorted by title or release date.</li>
        <li><strong>User-Friendly Design:</strong> The app works well on both desktop and mobile devices.</li>
      </ul>
    </section>
    <section>
      <h2>How to Start the App</h2>
      <ol>
        <li><strong>Clone the Repository:</strong></li>
        <pre><code>git clone https://github.com/username/movie-search-app.git
cd movie-search-app</code></pre>
        <li><strong>Set Up PHP Backend (if needed):</strong> Make sure PHP is installed, and run a local server from the project directory:</li>
        <pre><code>php -S localhost:8000</code></pre>
        <li><strong>Open in a Browser:</strong> Navigate to <a href="http://localhost:8000">http://localhost:8000</a> in your web browser.</li>
      </ol>
      <div class="note">
        <p><strong>Note:</strong> Once started, you can search for movies, mark them as favorites, and sort them as you explore the application.</p>
      </div>
    </section>
  </main>
</body>
</html>
