# modal_commands.py

import modal_funcs, testing

entryids = testing.idlist # len 112, codes like '1998-2'

urls = modal_funcs.itemURLs('hyperlinks.csv') # len 112, '' if none

itemids = modal_funcs.splitURLs(urls) # len 112, codes like '551' from end of url 
#NB: '' --> 'none'; freq('none') = 45 using Counter(itemids).most_common(1)

# prints JSON-formatted string
bothids = modal_funcs.makeObjects(entryids, itemids) # len 112

# below: matrix of line nums, item ids, and filenames
imageinfo = modal_funcs.imageInfo('omeka_files.csv')
# individual vectors:
linenums = imageinfo[0]
omeka_item_ids = imageinfo[1]
filenames = imageinfo[2]

idswithfiles = modal_funcs.itemsWithFilenames(omeka_item_ids, filenames)

# below: for all item matches, return [entryid, itemid, file.name]
filematches = modal_funcs.matchItemsWithFiles(entryids, itemids, idswithfiles)

# below: jpg filenames
jpgs = modal_funcs.normalizeFiles(filematches)

matches = modal_funcs.make112(jpgs, itemids)

# list of tuples, ('pic.name', 'entryid')
zipped = [(m, str(e)) for m, e in zip(matches, entryids)] # len 112

# below: what to do in html for {16}
imgs = modal_funcs.insertInEntries(matches)

# below: what to do in html for {17} (buttons for modal)
buttons = modal_funcs.insertButtons(itemids)
print(buttons)