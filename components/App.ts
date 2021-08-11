import * as ε from '../tools/ε/';

// import components
import Header from './Header';

class App extends ε.Component {
// We want to render html like: 

  //     <div>
  //       <Header />
  //     </div>
  render() {
    return ε.createElement(
      'div',
      {},
      [ε.createElement(Header, {}, [])]
      );
  }
}

export default App;