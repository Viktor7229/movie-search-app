<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
  <h2>How to Start</h2>
  <ol>
    <li><strong>Clone the Repository:</strong></li>
    <code>git clone https://github.com/username/movie-search-app.git</code>
    <code>cd movie-search-app</code>

    <li><strong>Set Up the API Key:</strong></li>
    <p>Create a <code>config.php</code> file based on <code>config.example.php</code> and add your API key:</p>
    <pre><code>
    <?php
    return [
        'api_key' => 'your_tmdb_api_key_here'
    ];
    ?>
    </code></pre>

    <li><strong>Start the PHP Server:</strong></li>
    <code>php -S localhost:8000</code>

    <li><strong>Open in Your Browser:</strong></li>
    <p>Navigate to <a href="http://localhost:8000/frontend/index.html">http://localhost:8000/frontend/index.html</a>.</p>
  </ol>
</section>

  </main>
</body>
</html>
