const d = document,
  $main = d.querySelector("section"),
  $links = d.querySelector(".links");

const PokeLink = "https://pokeapi.co/api/v2/pokemon/";

async function loadPokemons(url) {
  try {
    let res = await fetch(url);
    let json = await res.json();
    let $template = "",
      $prev,
      $next;

    console.log(json);

    $main.innerHTML = ""; 

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    for (let i = 0; i < json.results.length; i++) { 
      console.log(json.results[i]);

      try {
        let res = await fetch(json.results[i].url);
        let pokemon = await res.json();

        console.log(res, pokemon);

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        $template += `
          <figure>
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              <figcaption>${pokemon.name}</figcaption>
          </figure>
        `;

        
      } catch (error) {
        console.log(error);
        let message = error.statusText || "Ocurrió un error"; // Corregido "err" a "error"

        $template += `
          <figure>
              <figcaption>Error ${error.status} ${message}</figcaption>
          </figure>
          
        `;
      }
    }

    $main.innerHTML = $template;


    $prev = json.previous ? `<a href="${json.previous}">⏮️ </a>`: ""; 
    $next = json.next ? `<a href="${json.next}"> ⏭️</a>`: "";

   $links.innerHTML = $prev + "" + $next; 


  } catch (error) {
    console.log(error);
    let message = error.statusText || "Ocurrió un error";
    $main.innerHTML = `<p> Error ${error.status} ${message} </p>`;
  }
}

d.addEventListener("DOMContentLoaded", e => loadPokemons(PokeLink));

d.addEventListener("click", e => {
  if(e.target.matches(".links a")) {
    e.preventDefault();
    loadPokemons(e.target.getAttribute("href"));
  }
})

