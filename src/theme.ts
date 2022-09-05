import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    elementary: Palette['primary'];
    preintermediate: Palette['primary'];
    intermediate: Palette['primary'];
    upperintermediate: Palette['primary'];
    advanced: Palette['primary'];
    proficiency: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    elementary?: PaletteOptions['primary'];
    preintermediate?: PaletteOptions['primary'];
    intermediate?: PaletteOptions['primary'];
    upperintermediate?: PaletteOptions['primary'];
    advanced?: PaletteOptions['primary'];
    proficiency?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    elementary: true;
    preintermediate: true;
    intermediate: true;
    upperintermediate: true;
    advanced: true;
    proficiency: true;
  }
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsColorOverrides {
    success: true;
    error: true;
    info: true;
    warning: true;
    standard: false;
    elementary: true;
    preintermediate: true;
    intermediate: true;
    upperintermediate: true;
    advanced: true;
    proficiency: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    success: true;
    error: true;
    info: true;
    warning: true;
    standard: false;
    elementary: true;
    preintermediate: true;
    intermediate: true;
    upperintermediate: true;
    advanced: true;
    proficiency: true;
  }
}

export const theme = createTheme({
  palette: {
    elementary: {
      main: '#83ade0',
      light: '#9ac3f5',
      dark: '#6799e5',
      contrastText: '#fff',
    },
    preintermediate: {
      main: '#187795',
      light: '#2489a9',
      dark: '#0c5d77',
      contrastText: '#fff',
    },
    intermediate: {
      main: '#86CB92',
      light: '#a2e1ad',
      dark: '#58ab66',
      contrastText: '#fff',
    },
    upperintermediate: {
      main: '#EDB458',
      light: '#ffc870',
      dark: '#e1a036',
      contrastText: '#fff',
    },
    advanced: {
      main: '#F68E5F',
      light: '#ffa984',
      dark: '#e37645',
      contrastText: '#fff',
    },
    proficiency: {
      main: '#E15554',
      light: '#fc7372',
      dark: '#c54342',
      contrastText: '#fff',
    },
  },
});
