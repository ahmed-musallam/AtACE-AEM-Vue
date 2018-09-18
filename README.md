# Vue Sample Implementation with AEM

## Solr
Some components in this implementation require a running solr instance with the tutorial `techproducts` collection.

Please follow only exercise 1 of the [tutorial](http://lucene.apache.org/solr/guide/7_4/solr-tutorial.html#launch-solr-in-solrcloud-mode).

**NOTES**

- Please make sure your cloud instances are running on ports `8982` and `8981` instead of the default `8983` and `7574`.
- When you reach the point of posting data to solr, ie running this command:

	`bin/post -c techproducts example/exampledocs/*`
	
	Please add `-p 8982` to post data to your solr instances.

- [Enable CORS in SOLR](http://marianoguerra.org/posts/enable-cors-in-apache-solr.html)



