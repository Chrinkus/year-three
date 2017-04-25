import { addThree, multTwo } from 'lib';
import * as props from 'props';

console.log(multTwo(addThree(props.getFive())));
