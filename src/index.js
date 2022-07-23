import { render } from '@wordpress/element';
import './Store';
import App from './App';
import './styles.scss';
import './graph.scss';

render( <App />, document.getElementById( 'awesomemotive-app' ) );
