import './App.css'
import { GameCard } from './components/GameCard';
import { SearchBar } from './components/SearchBar';
import { useEffect, useReducer } from 'react';
import logo from './assets/logo.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Game {
  title: string;
  thumb: string;
  normalPrice: string;
  salePrice: string;
  steamAppID: string;
}

interface State {
  games: Game[];
  page: number;
  titleParam: string;
}

interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

function App() {

  const initialState = {
    games: [],
    page: 0,
    titleParam: ''
  }

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_GAMES':
        return { ...state, games: action.payload };
      case 'SET_PAGE':
        return { ...state, page: action.payload };
      case 'SET_TITLE_PARAM':
        return { ...state, titleParam: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect((): void => {
    async function getGames(): Promise<void> {
      fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=6&pageNumber=${state.page}${state.titleParam}`).
        then((res) => res.json()).
        then((res) => dispatch({ type: 'SET_GAMES', payload: res}));
    }
    getGames();
    window.scrollTo(0, 0);
  }, [state.page, state.titleParam]);

  function toSearch(title: string) {
    dispatch({ type: 'SET_TITLE_PARAM', payload: `&title=${title}`});
  }

/*  
  <SearchBar 
        onSearch={toSearch}
      />

*/
  return <div className='body'>
    <div className='header'>
      <img src={logo} alt="logo"/>
      
    </div>
    <div className='main-content'>
      {state.games.length == 0 && <h2>Fim da visualização...</h2>}
      {state.games.map((game:Game) => (
        <GameCard 
          title={game.title} 
          imageUrl={game.thumb}
          normalPrice={game.normalPrice}
          salePrice={game.salePrice}
          storeUrl={`https://store.steampowered.com/app/${game.steamAppID}`}
        />
      ))}
    </div>
    <div className="page-navigator">
      <button onClick={() => {
        if(state.page > 0) dispatch({ type: 'SET_PAGE', payload: state.page - 1});
      }}><ArrowBackIosIcon /></button>
      <h2>{state.page+1}</h2>
      <button onClick={() => {
        if(state.games.length == 6) dispatch({ type: 'SET_PAGE', payload: state.page + 1});
      }}><ArrowForwardIosIcon /></button>
    </div>
  </div>
}

export default App
