/*

API Doc:
https://pokeapi.co/docs/v2#pokemon
Endpoint:
https://pokeapi.co/api/v2/pokemon/{id or name}/

Create an app that searches the pokemon API for a
specific pokemon and displays in #pokemon that pokemon's
- Name
- Image (front_default in the response) with the pokemon name
as the alt text
- height in inches rounded to a whole number (the response
is in decimeters)
- weight in pounds rounded to a whole number (the response
is in hectograms)
- types as a comma separated list

(Helper functions are provided to convert the pokemon's height
and weight to imperial units from metric.)

After a successful search, it should clear the input field's value.
The app should also only display one pokemon's information at a time.

BONUS:
If the pokemon is not found, it should display
"pokemon not found"

If fetch throws an error, the app should display the error message

*/

var URL = "https://pokeapi.co/api/v2/pokemon/"
var pokemonDiv = document.getElementById('pokemon')
var form = document.querySelector('form')

form.onsubmit = function(e) {
  e.preventDefault()

  var searchTerm = this.pokemonName.value.trim()
  if (!searchTerm) return

  form.pokemonName.value = ""

  fetch(URL + searchTerm)
  .then(function(res) {
    if (res.status !== 200) {
      throw new Error('Pokemon not found')
    }
    return res.json()
  })
  .then(getPokemonData)
  .catch(function(err) {
    pokemonDiv.innerHTML = err.message
  })
}

function getPokemonData(pokemon) {
  pokemonDiv.innerHTML = ''

  var name = document.createElement('h2')
  name.textContent = pokemon.name.toLowerCase() + ' :3'
  pokemonDiv.appendChild(name)

  var sprite = document.createElement('img')
  sprite.src = pokemon.sprites.front_shiny
  sprite.alt = pokemon.name
  sprite.width = 120
  pokemonDiv.appendChild(sprite)

  var height = document.createElement('p')
  height.textContent = 'height: ' + convertToInches(pokemon.height) + ' in'
  pokemonDiv.appendChild(height)

  var weight = document.createElement('p')
  weight.textContent = 'weight: ' + convertToPounds(pokemon.weight) + ' lbs'
  pokemonDiv.appendChild(weight)

  var types = document.createElement('p')
  types.textContent = 'types: '
  pokemon.types.forEach(function(typeData, index) {
    var typeSpan = document.createElement('span')
    typeSpan.textContent = typeData.type.name
    typeSpan.className = 'type ' + typeData.type.name
    types.appendChild(typeSpan)
    if (index < pokemon.types.length - 1) {
      types.appendChild(document.createTextNode(' '))
    }
  })
  pokemonDiv.appendChild(types)
}

function convertToInches(decimeters) {
  // 2.54 centimeters per inch
  return Math.round(decimeters * 10 / 2.54)
}

function convertToPounds(hectograms) {
  // 2.2 lbs per kilogram
  return Math.round(hectograms / 10 * 2.2)
}

/* 
professor's code:

var URL = "https://pokeapi.co/api/v2/pokemon/"
var pokemonDiv = document.getElementById('pokemon')
var form = document.querySelector('form')

form.onsubmit = function(e) {
  e.preventDefault()

  var searchTerm = this.pokemonName.value.trim()
  if (!searchTerm) return

  form.pokemonName.value = ""

  fetch(URL + searchTerm)
  .then(function(res) {
    if (res.status !== 200) {
      throw new Error('Pokemon not found')
    }
    return res.json()
  })
  .then(renderPokemon)
  .catch(function(err) {
    pokemonDiv.innerHTML = err.message
  })
}

function renderPokemon(pokemon) {
  pokemonDiv.innerHTML = ""

  var h3 = document.createElement('h3')
  h3.textContent = pokemon.name.toUpperCase()
  pokemonDiv.appendChild(h3)

  var img = document.createElement('img')
  img.src = pokemon.sprites.front_default
  img.alt = pokemon.name
  pokemonDiv.appendChild(img)

  var height = document.createElement('p')
  height.textContent = convertToInches(pokemon.height) + ' in'
  pokemonDiv.appendChild(height)

  var weight = document.createElement('p')
  weight.textContent = convertToPounds(pokemon.weight) + ' lbs'
  pokemonDiv.appendChild(weight)

  var types = document.createElement('p')
  types.textContent = pokemon.types.map(function(typeObj) {
    return typeObj.type.name
  }), join(", ")
  pokemonDiv.appendChild(types)
}

*/