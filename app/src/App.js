import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import React from "react";
import HomePage from "pages/HomePage";
const data = require("./static/data.json");


const muiTheme = createMuiTheme({
  fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Helvetica Neue", YuGothic, Arial, Meiryo, sans-serif'
});

class App extends React.Component {
  render() {
    let props = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={()=><HomePage data={data} {...props}/>} />
            <Route path="*" component={()=><HomePage data={data} {...props}/>} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
export default App;
