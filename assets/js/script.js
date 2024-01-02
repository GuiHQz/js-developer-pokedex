const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
let offset = 0;
const limit = 15;

const convertCharToUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const convertPokemonToLi = (pokemon) => {
  return `
    <li class="pokemon ${pokemon.type}">
      <div class="name">
        <span>${convertCharToUpper(pokemon.name)}</span>
        <span>#${
          pokemon.number < 10
            ? `00${pokemon.number}`
            : pokemon.number < 100
            ? `0${pokemon.number}`
            : pokemon.number
        }</span>
      </div>
      <div class="data">
        <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="${type}">${type}</li>`)
            .join(" ")}
        </ol>
        <img
          src="${pokemon.photo}"
          alt="${pokemon.name}"
        />
      </div>
     </li>
  `;
};

const loadPokemonItems = (offset, limit) => {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = {}) => {
      const newHtml = pokemons
        .map((pokemon) => convertPokemonToLi(pokemon))
        .join("");
      pokemonList.innerHTML += newHtml;

      // OBS: Tudo isso pode ser feito
      // pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    })
    .catch((error) => console.log("Ocorred an error: " + error));
};

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }

  loadPokemonItems(offset, limit);
});
