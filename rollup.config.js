import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        dir: 'dist',
    },
    plugins: [
        commonjs(),
        nodeResolve(),
        typescript(),
    ],
};
