# modal_commands.py

import modal_funcs, testing

entryids = testing.idlist # len 112, codes like '1998-2'

urls = modal_funcs.itemURLs('hyperlinks.csv') # len 112, '' if none

itemids = modal_funcs.splitURLs(urls) # len 112, codes like '551' from end of url 
#NB: '' --> 'none'; freq('none') = 45 using Counter(itemids).most_common(1)

#import json
#print(json.dumps({'4': 5, '6': 7}, sort_keys=True, indent=4))

objectlist = modal_funcs.makeObjects(entryids, itemids, urls) # len 112
import json
prettyobjects = json.dump(objectlist, open('myobjects.js', 'w'), indent=4)
