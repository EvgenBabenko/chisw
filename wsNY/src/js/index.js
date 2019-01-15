import NuclearStation from './core/NuclearStation';
import Cli from './core/Cli';
import Controller from './core/Controller';

const nuclearStation = new NuclearStation(); // model
const cli = new Cli(nuclearStation); // view
const controller = new Controller(nuclearStation, cli); // controller
