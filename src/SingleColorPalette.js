import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PaletteFooter from './PaletteFooter'; 
import { withStyles } from '@material-ui/styles'; 
import NavBar from './NavBar'; 
import ColorBox from './colorBox'; 
import {Opacity} from '@material-ui/icons'

const styles = {
  palette: {
    height: "100vh",
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  colors: {
    height: "90%"
  }, 
  goBack: {
      width: "20%",
      height: "50%",
      margin: "0 auto",
      position: "relative",
      display: "inline-block",
      cursor: "pointer",
      marginBottom: "-3.5px",
      Opacity: 1,
      backgroundColor: "black",
     "& a": {
          width: "80px",
          height: "25px",
          position: "absolute",
          display: "inline-block",
          top: "50%",
          left: "50%",
          marginTop: "-15px",
          marginLeft: "-50px",
          outline: "none",
          background: "rgba(255, 255, 255, 0.3)",
          fontSize: ".8rem",
          lineHeight: "30px",
          color: "white",
          textTransform: "uppercase",
          border: "none",
          textTecoration: "none",
          textTlign: "center",
          opacity: 1,
          textDecoration: "none", 
          textAlign: "center"
      }
  }

}

export class SingleColorPalette extends Component {
  constructor(props) {
    super(props); 
    this._shade = this.gatherShades(this.props.palette, this.props.colorId); 
    this.state = { format: "hex" }; 
  }
  gatherShades = (palette, colorToFilterBy) => {
    let shades = []; 
    let allColors = palette.colors; 
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    }
    return shades.slice(1); 
  }

  changeFormat = (value) => {
    this.setState({format: value})
  }
  render() { 
    const { format } = this.state; 
    const { classes } = this.props;
    const { PaletteName, emoji, id } = this.props.palette; 
    const colorBox = this._shade.map(color => (
      <ColorBox key={color.name} name={color.name} background={color[format]}/>
    ))
    return (
      <div className={classes.palette}>
        <NavBar handleChange={this.changeFormat}/>
        <div className={classes.colors}>
          {colorBox}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>go back</Link>
          </div>
        </div>
        <PaletteFooter paletteName={PaletteName} emoji={emoji}/>
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
