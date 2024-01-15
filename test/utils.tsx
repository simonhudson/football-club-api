import React, { ReactNode } from 'react';
import { render as doRender, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/theme';

export const render = (childToRender: ReactNode) => {
	return doRender(<ThemeProvider theme={theme}>{childToRender}</ThemeProvider>);
};

export const getTagName = (element: { tagName: any }) => {
	return element?.tagName?.toLowerCase() ?? undefined;
};
