import React, { Component } from 'react';
import { connect } from 'react-redux';
import Album from '../components/Album/album';

const mapStateToProps = (state) => ({
	getFetchAblum: state.album
});

export default connect(mapStateToProps,null)(Album)

