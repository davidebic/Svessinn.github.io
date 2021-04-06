#!/usr/bin/env python3

#==============================================#
#         Created By: Svess#8004               #
#  Last Modification:  2021-03-06 10: UTC+0  #
#==============================================#

# Imports
from collections import defaultdict as ddict

# Initialising a default dict to store the reactions
dct = ddict(int)

# List of files that the program will read through
# Should be .txt files
# We recommend compiling your data using DiscordChatExporter
files = [

# Dataset 1 
# 2021-03-15 22:00 UTC - 2021-03-31 07:26 UTC
# Server: Mudae World
# After Light kakera was added
# Uses Emoji Names in reactions

#"resources-1/flood-1.txt",
#"resources-1/flood-2.txt",
#"resources-1/flood-3.txt",
#"resources-1/flood-4.txt",
#"resources-1/flood-5.txt",
#"resources-1/flood-6.txt",
#"resources-1/flood-7.txt",
#"resources-1/flood-8.txt",
#"resources-1/flood-9.txt",
#"resources-1/flood-husbando.txt",
#"resources-1/flood-waifu.txt",
#"resources-1/marry-roulette.txt"


# Dataset 2
# 2020-12-31 22:00 UTC - 2021-02-28 22:00 UTC
# Server: Mudae World
# Before Light kakera was added
# Uses Emoji Names in reactions

"resources-2/flood-1.txt",
"resources-2/flood-2.txt",
"resources-2/flood-3.txt",
"resources-2/flood-4.txt",
"resources-2/flood-5.txt",
"resources-2/flood-6.txt",
"resources-2/flood-7.txt",
"resources-2/flood-8.txt",
"resources-2/flood-9.txt",
"resources-2/flood-husbando.txt",
"resources-2/flood-waifu.txt",
"resources-2/marry-roulette.txt"


# Dataset 3
# 2021-03-15 22:00 UTC - 2021-04-02 09:00 UTC
# Servers in File Path
# After Light kakera was added
# Uses Emoji IDs in reactions

#"resources-3/Mudae-World/flood-1.txt",
#"resources-3/Mudae-World/flood-2.txt",
#"resources-3/Mudae-World/flood-3.txt",
#"resources-3/Mudae-World/flood-4.txt",
#"resources-3/Mudae-World/flood-5.txt",
#"resources-3/Mudae-World/flood-6.txt",
#"resources-3/Mudae-World/flood-7.txt",
#"resources-3/Mudae-World/flood-8.txt",
#"resources-3/Mudae-World/flood-9.txt",
#"resources-3/Mudae-World/flood-husbando.txt",
#"resources-3/Mudae-World/flood-waifu.txt",
#"resources-3/Mudae-World/marry-roulette.txt",
#"resources-3/Rollsdae-World/rolls-1.txt",
#"resources-3/Rollsdae-World/rolls-2.txt",
#"resources-3/Rollsdae-World/rolls-3.txt",
#"resources-3/Rollsdae-World/rolls-4.txt",
#"resources-3/Rollsdae-World/rolls-5.txt",
#"resources-3/Rollsdae-World/rolls-6.txt",
#"resources-3/Rollsdae-World/rolls-7.txt",
#"resources-3/Rollsdae-World/rolls-8.txt",
#"resources-3/Rollsdae-World/rolls-9.txt",
#"resources-3/Rollsdae-World/rolls-10.txt",
#"resources-3/Rollsdae-World/rolls-11.txt",
#"resources-3/Rollsdae-World/rolls-12.txt",
#"resources-3/Rollsdae-World/rolls-13.txt",
#"resources-3/Rollsdae-World/rolls-14.txt",
#"resources-3/Rollsdae-World/rolls-15.txt",
#"resources-3/Rollsdae-World/rolls-16.txt",
#"resources-3/Rollsdae-World/rolls-17.txt",
#"resources-3/Rollsdae-World/rolls-18.txt",
#"resources-3/Rollsdae-World/rolls-oui-rolls.txt",
#"resources-3/Rollsdae-World/rolls-sim-rolls.txt",
#"resources-3/Rollsdae-World/rolls-yes-rolls.txt",
#"resources-3/Shadbase/mudae-rolls-spam.txt",
#"resources-3/Dyrus/waifu-gacha.txt"
]

sm = 0 # Counter 

# Runs through all the desired files
for File in files:
  searchfile = open(File, "r") # Opening the next File, read only

  # Reads through each line
  for line in searchfile:
    # Checkin if a Message by your specific MudaBOT is a response to a kakeraL reaction
    if ":rollstack:" in line or ":2tierUS:" in line or ":1tierUS:" in line and ":qualityup:" not in line:
      sm+=1 # Adds to the counter
      # Splits the line
      lst = list(line.split())
      # Adding the kl items to the dict
      for i in lst:
        if ":wlslot:" in i:
          dct[":wlslot:"]+=1
        if ":wishprotect:" in i:
          dct[":wishprotect:"]+=1
        if ":rtcd:" in i:
          dct[":rtcd:"]+=1
        if ":morekakera:" in i:
          dct[":morekakera:"]+=1
        if ":mudapin:" in i:
          dct[":mudapin:"]+=1
        if ":disablemore:" in i:
          dct[":disablemore:"]+=1
        if ":addroll:" in i:
          dct[":addroll:"]+=1
          
  searchfile.close() # Closing the read File so it's ready for the next one

print(dct) # Prints out the raw data
print('from', sm, '$kl')
