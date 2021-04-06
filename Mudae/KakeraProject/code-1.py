#!/usr/bin/env python3

#==============================================#
#         Created By: Svess#8004               #
#  Last Modification:  2021-03-04 12:14 UTC+0  #
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

#"resources-2/flood-1.txt",
#"resources-2/flood-2.txt",
#"resources-2/flood-3.txt",
#"resources-2/flood-4.txt",
#"resources-2/flood-5.txt",
#"resources-2/flood-6.txt",
#"resources-2/flood-7.txt",
#"resources-2/flood-8.txt",
#"resources-2/flood-9.txt",
#"resources-2/flood-husbando.txt",
#"resources-2/flood-waifu.txt",
#"resources-2/marry-roulette.txt"


# Dataset 3
# 2021-03-15 22:00 UTC - 2021-04-02 09:00 UTC
# Servers in File Path
# After Light kakera was added
# Uses Emoji IDs in reactions

"resources-3/Mudae-World/flood-1.txt",
"resources-3/Mudae-World/flood-2.txt",
"resources-3/Mudae-World/flood-3.txt",
"resources-3/Mudae-World/flood-4.txt",
"resources-3/Mudae-World/flood-5.txt",
"resources-3/Mudae-World/flood-6.txt",
"resources-3/Mudae-World/flood-7.txt",
"resources-3/Mudae-World/flood-8.txt",
"resources-3/Mudae-World/flood-9.txt",
"resources-3/Mudae-World/flood-husbando.txt",
"resources-3/Mudae-World/flood-waifu.txt",
"resources-3/Mudae-World/marry-roulette.txt",
"resources-3/Rollsdae-World/rolls-1.txt",
"resources-3/Rollsdae-World/rolls-2.txt",
"resources-3/Rollsdae-World/rolls-3.txt",
"resources-3/Rollsdae-World/rolls-4.txt",
"resources-3/Rollsdae-World/rolls-5.txt",
"resources-3/Rollsdae-World/rolls-6.txt",
"resources-3/Rollsdae-World/rolls-7.txt",
"resources-3/Rollsdae-World/rolls-8.txt",
"resources-3/Rollsdae-World/rolls-9.txt",
"resources-3/Rollsdae-World/rolls-10.txt",
"resources-3/Rollsdae-World/rolls-11.txt",
"resources-3/Rollsdae-World/rolls-12.txt",
"resources-3/Rollsdae-World/rolls-13.txt",
"resources-3/Rollsdae-World/rolls-14.txt",
"resources-3/Rollsdae-World/rolls-15.txt",
"resources-3/Rollsdae-World/rolls-16.txt",
"resources-3/Rollsdae-World/rolls-17.txt",
"resources-3/Rollsdae-World/rolls-18.txt",
"resources-3/Rollsdae-World/rolls-oui-rolls.txt",
"resources-3/Rollsdae-World/rolls-sim-rolls.txt",
"resources-3/Rollsdae-World/rolls-yes-rolls.txt",
"resources-3/Shadbase/mudae-rolls-spam.txt",
"resources-3/Dyrus/waifu-gacha.txt"
]

kakeraAvgVal = {
'kakeraP': 100,
'kakera': 125.5,
'kakeraT': 195.5,
'kakeraG': 275.5,
'kakeraY': 450.5,
'kakeraO': 750.5,
'kakeraR': 1450.5,
'kakeraW': 3050.5
}

sm = 0 # Counter for the number of Light kakera

# IDs of the Mudae Bots that counld be used
# You can add more if you have a different 
# Maid/Butler in the server your data is from
MudaDict = {
"Mudae":"Mudae#0807",
"Mudamaid2":"Mudamaid2#2147"
}

# Runs through all the desired files
for File in files:
  searchfile = open(File, "r") # Opening the next File, read only
  lastLine = '' # Initialising a last line to be able to find the reactions later

  # Reads through each line
  for line in searchfile:
    # Checkin if a Message by your specific MudaBOT is a response to a kakeraL reaction
    if ":kakeraL:breaks down into:" in line and (MudaDict["Mudamaid2"] in lastLine or MudaDict["Mudae"] in lastLine):
      sm+=1 # Adds to the Light kakera counter
      # Strips the line into the kakera emotes and then
      # splits the line into a list of the kakera broken
      # down from the kakeraL reaction
      lst = list(line[26:-1].split(': =>')[0].split(':+:'))
      # Adding the kakera breakdown to the dict
      for i in lst:
        dct[i]+=1

    lastLine = line # Updates the lastLine variable

  searchfile.close() # Closing the read File so it's ready for the next one

# Summing the number of kakera that the
# Light kakera broke down into and getting
# the average value of the kakera
dctsm = 0
valsm = 0

for i in dct:
  dctsm += dct[i]
  valsm += dct[i]*kakeraAvgVal[i]

print(dct) # Prints out the raw data

print('\nPurple:', dct['kakeraP'], '\nBlue:', dct['kakera'], '\nTeal:', dct['kakeraT'], 
'\nGreen:', dct['kakeraG'], '\nYellow:', dct['kakeraY'], '\nOrange:', dct['kakeraO'], 
'\nRed:', dct['kakeraR'], '\nRainbow:', dct['kakeraW'], '\nFor a total of',
 dctsm, 'kakera\nBroken down from', sm, 'Light kakera')

print('\nDrop chnances of kakera:\n\nPurple: ', format(round(100*dct['kakeraP']/dctsm, 6), '.4f'), '%', 
'\nBlue: ', format(round(100*dct['kakera']/dctsm, 6), '.4f'), '%', 
'\nTeal: ', format(round(100*dct['kakeraT']/dctsm, 6), '.4f'), '%', 
'\nGreen: ', format(round(100*dct['kakeraG']/dctsm, 6), '.4f'), '%', 
'\nYellow: ', format(round(100*dct['kakeraY']/dctsm, 6), '.4f'), '%', 
'\nOrange: ', format(round(100*dct['kakeraO']/dctsm, 6), '.4f'), '%', 
'\nRed: ', format(round(100*dct['kakeraR']/dctsm, 6), '.4f'), '%', 
'\nRainbow: ', format(round(100*dct['kakeraW']/dctsm, 6), '.4f'), '%', sep='')

print('\nThe average value of a kakera broken down from a light kakera is:', format(round(valsm/dctsm, 6), '.4f'))



