# Vue Sample Implementation with AEM



# aem-sample-vue-silos
A demo of a pattern where each AEM component *can* be a Vue instance.

# aem-sample-vue-application
A demo of a full vue app (with Vue Cli, nodejs.. etc)


## **IMPORTANT:** Setting up Solr
Some components in this implementation require a running solr instance with the sample `techproducts` collection from this [tutorial](http://lucene.apache.org/solr/guide/7_4/solr-tutorial.html#launch-solr-in-solrcloud-mode).

Please only follow exercise 1 of the [tutorial](http://lucene.apache.org/solr/guide/7_4/solr-tutorial.html#launch-solr-in-solrcloud-mode).

**BEFORE HEADING TO THE TUTORIAL**

- Please make sure your cloud instances are running on ports `8982` and `8981` instead of the default `8983` and `7574` setin the default.
- When you reach the point of posting data to solr, ie running this command:

  `bin/post -c techproducts example/exampledocs/*`

	Please add `-p 8982` to post data to your solr instances. (we switched ports, remember)

- [Enable CORS in SOLR](http://marianoguerra.org/posts/enable-cors-in-apache-solr.html)
This is a must! requests to SOLR wont work otherwise. This is a local setup so CORS is okay here ;)



