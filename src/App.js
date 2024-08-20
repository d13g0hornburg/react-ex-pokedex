import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      carregando: false,
      erro: ''
    };
  }

  // Adiciona um Pokémon aleatório à lista de pokémons
  adicionarPokemon = async () => {
    this.setState({ carregando: true, erro: '' });

    try {
      // Gera um ID aleatório entre 1 e 898 (o número total de Pokémon na PokeAPI)
      const pokemonId = Math.floor(Math.random() * 898) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const pokemon = response.data;

      // Adiciona o Pokémon à lista
      const novoPokemon = {
        nome: pokemon.name,
        imagem: pokemon.sprites.front_default
      };

      this.setState((prevState) => ({
        pokemons: [...prevState.pokemons, novoPokemon],
        carregando: false
      }));
    } catch (error) {
      console.error('Erro ao obter o Pokémon:', error);
      this.setState({ erro: 'Não foi possível obter o Pokémon. Tente novamente.', carregando: false });
    }
  }

  // Remove o Pokémon da lista com base no índice
  removerPokemon = (index) => {
    this.setState((prevState) => ({
      pokemons: prevState.pokemons.filter((_, i) => i !== index)
    }));
  }
render() {
    const { pokemons, carregando, erro } = this.state;

    return (
      <div>
        <h1>Pokémon Aleatórios</h1>
        <button onClick={this.adicionarPokemon} disabled={carregando}>
          {carregando ? 'Carregando...' : 'Adicionar Pokémon'}
        </button>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <ul>
          {pokemons.length > 0 ? (
            pokemons.map((pokemon, index) => (
              <li key={index}>
                <strong>{pokemon.nome}</strong>
                <img src={pokemon.imagem} alt={pokemon.nome} width="100" />
                <button onClick={() => this.removerPokemon(index)}>Remover</button>
              </li>
            ))
          ) : (
            <li>Adicione Pokémon para ver a lista.</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
