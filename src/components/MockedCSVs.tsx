/**
 * A dictionary that contains mocked CSV data
 * Keys represent the file paths, and values represent the CSV data as arrays. 
 */

const csvDict: { [key: string]: string[][] } = {
  exampleCSV1: [
    ["sophia", "sagittarius", "blue"],
    ["melanie", "aries", "purple"],
    ["avery", "capricorn", "red"],
  ],
  colors: [
    ["red", "blue", "yellow"],
    ["orange", "green", "purple"],
  ],
  flowers: [
    ["lily", "blue"],
    ["lily", "green"],
    ["daisy", "red"],
    ["sunflower", "yellow"],
    ["lily", "pink"],
    ["poppy", "red"],
    ["mangolia", "blue"],
    ["lily", "green"],
  ],
  fruits: [
    ["name", "color"],
    ["orange", "orange"],
    ["apple", "red"],
    ["yellow", "banana"],
  ],
  students: [
    ["name", "year", "age", "major", "dorm", "id number"],
    ["grace", "freshman", "18", "iapa", "andrews", "38567495"],
    ["sophie", "freshman", "17", "hiaa", "metcalf", "84739057"],
    ["emily", "sophomore", "20", "hiaa", "slater", "947385759"],
    ["jake", "senior", "22", "pols", "danoff", "17584769"],
  ],
  malformed: [["name"], ["", "orange"], ["apple", "red"], ["yellow", "banana"]],
  empty: []
};

export default csvDict;
