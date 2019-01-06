import React from 'react';

class Test extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//data loading
	}

	componentWillUnmount() {
		//cleanup
	}

	render() {
	  return (
	     <div>
	       { /* JSX */ }
	     </div>
	  );
	}
}

Test.propTypes = {
  title: React.PropTypes.string
};

export default Test;