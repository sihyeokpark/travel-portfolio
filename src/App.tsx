import { Earth } from './components/Earth'
import { MakeWorldMap } from './components/Continent'

const EARTH_RADIUS = 8

function App() {
  return (
    <>
      <MakeWorldMap />
      <Earth earthRadius={EARTH_RADIUS}></Earth>
    </>
  )
}

export default App
