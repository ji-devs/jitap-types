import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
	{
        input: './src/Lib.ts',
        external: ['sanctuary-def'],
        output: [
            { file: pkg.module, format: 'es', sourcemap: true },
            { file: pkg.main, format: 'cjs', sourcemap: true }
        ],
        plugins: [
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false //will be run as a separate step via tsc which is more thorough
                    }
                },
                useTsconfigDeclarationDir: true,
            })
        ]
	}
];
