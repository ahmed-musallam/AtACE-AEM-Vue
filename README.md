# Vue Sample Implementation with AEM



# aem-sample-vue-silos
A demo of a pattern where each AEM component *can* be a Vue instance.

# aem-sample-vue-application
A demo of a full vue app (with Vue Cli, nodejs.. etc)



## Setting up Solr
Some components in this implementation require a running solr instance with the example `techproducts` collection.

 - get solr 7.4 from [here](http://www.apache.org/dyn/closer.lua/lucene/solr/7.4.0/solr-7.4.0.tgz`)
 - extract solr zip and assume `${SOLR_HOME}` is the folder you've extracted
 - Open this file: `${SOLR_HOME}/server/solr-webapp/webapp/WEB-INF/web.xml` 
 - In the `web.xml` file: **before the first `<filter>`** tag, insert this:
  > read [here](http://marianoguerra.org/posts/enable-cors-in-apache-solr.html) for why.

  ```xml
  <filter>
      <filter-name>cross-origin</filter-name>
      <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
      <init-param>
          <param-name>allowedOrigins</param-name>
          <param-value>http://localhost*</param-value>
      </init-param>
      <init-param>
          <param-name>allowedMethods</param-name>
          <param-value>GET,POST,DELETE,PUT,HEAD,OPTIONS</param-value>
      </init-param>
      <init-param>
          <param-name>allowedHeaders</param-name>
          <param-value>origin, content-type, cache-control, accept, options, authorization, x-requested-with</param-value>
      </init-param>
      <init-param>
          <param-name>supportsCredentials</param-name>
          <param-value>true</param-value>
      </init-param>
      <init-param>
        <param-name>chainPreflight</param-name>
        <param-value>false</param-value>
      </init-param>
  </filter>

  <filter-mapping>
    <filter-name>cross-origin</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
  ```
 - Now run `${SOLR_HOME}/bin/solr -e techproducts` to run the `techproducts` example.

 You should now have an instance of solr running on port `8983`

