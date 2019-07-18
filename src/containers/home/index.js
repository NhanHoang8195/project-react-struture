import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import './styles.scss';

function App(props) {
  const { data, isLoadingData } = props;
  useEffect(() => {
    props.actions.getListUser();
  }, [props.actions]);

  function handleClick() {
    props.actions.getListUser(true);
  }
  if (isLoadingData && !data) {
    return (<div>Data is loading...</div>);
  }
  return (
    <div className='home-containers'>
      {data && <ul>
        {data.map(dt => <li key={dt.id}>{dt.name}</li>)}
      </ul>}
      <button onClick={handleClick} disabled={isLoadingData}>Refresh</button>
    </div>
  );
}
const mapStateToProps = state => ({
  data: state.homeReducer.get('data'),
  isLoadingData: state.homeReducer.get('isLoadingData'),
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
