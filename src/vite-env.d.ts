/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
	import * as React from 'react';
	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>;
}

// Soporte para import con query `?react` usado por `vite-plugin-svgr`
declare module '*.svg?react' {
	import * as React from 'react'
	const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>
	export default ReactComponent
}
