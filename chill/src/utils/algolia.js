import algoliasearch from "algoliasearch";

const client = algoliasearch("T9K9JCADQ4", "2cc88a797d2bd19b635bb38c42f24aa4");

const algolia = client.initIndex("Chill Library");

export default algolia;
