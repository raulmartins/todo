import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Content from './templates/Content'
import About from './templates/About'

export default props =>
 <Switch>
  <Route exact path='/' component={Content} />
  <Route path='/about' component={About} />
  <Redirect from='*' to='/' />
 </Switch>
