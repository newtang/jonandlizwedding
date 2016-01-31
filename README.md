# jonandlizwedding
This is a quick port of my wedding website I made back in 2010 from PHP to Node. This should be easier from a maintenance perspective. At this juncture, not exactly doing everything by the book in terms of library management, build process, minification, etc. 

make decrypt_conf to decrypt the .env file
make encrypt_conf to encrypt the .env file

http://ejohn.org/blog/keeping-passwords-in-source-control/

I saved all the json files that the flickr library downloads. Not the best solution, but good enough for now. If I need to update it, I can locally delete the folder, run the app, and it'll redownload them. I can then recommit the diffs.