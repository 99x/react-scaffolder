import React from 'react';

class FileName extends React.Component {
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

FileName.propTypes = {
  title: React.PropTypes.string,
  likes: React.PropTypes.number
};

export default FileName;