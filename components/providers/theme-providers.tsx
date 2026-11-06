import { ThemeProvider as NextThemeProvider } from 'next-themes';
import React from 'react';

export const ThemeProvider = ({
    children,
    ...props
}:React.ComponentProps<typeof NextThemeProvider>) => {
    return (
       <NextThemeProvider{...props}>
       {children}
       </NextThemeProvider>
    );
};

export default ThemeProvider;