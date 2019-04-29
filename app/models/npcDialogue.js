//import NPC_FUNCTIONS from './npcFunctions';

export class NpcDialogue {

  constructor(game) {
    this.game = game;
    this.f = this.game.npcFunctions;
    this.data = {

    "Jason Kenney": [
      [
        //0
        ["Queen Notley, austerity, deficits and arrogance were the symptoms of a divided conservatism, left sick and weak from years of mismanagement.",
        "You ably profited from the rot of that era, but I will say it now from atop this mountain for the whole of Alberta to hear:"],
        0, // 0 if only 1 person talking, 1 if dialogue between 2 people
        1, // 1 if player speaks first, 0 if NPC
        1, // set next index
        () => this.f.intro_kenneyHoldsUpSword()
      ],
      [
        //1
        [
          "The Right is once again...",
          "...UNITED!"
        ],
        0,
        1,
        1,
        () => this.f.intro_endScene()
      ],
      [ //2
        [
          "Gentlemen, the Notley government's militating to find the crystals before us puts the pressure on. We can't afford to be dilatory.",
          "We MUST find those crystals. Now more than ever."
        ],
        0,
        1,
        3,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Chief of Staff'),true)
      ],
      [ //3
        [
          "But as our party convention last year showed, we have a particular challenge with members of our coalition staying on message.",
          "I want to hold THIS plan - my principal plan - close to my chest and oversee all parts of it."
        ],
        0,
        1,
        4,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Chief of Staff'), true)
      ],
      [ //4
        [
          "That's right. Unity first and above all. Period. Paragraph.",
          "*Chortle* The 'media' know nothing of the political arts.",
          "If our plan leaked to the press their *spin* would only get in the way."
        ],
        0,
        1,
        5,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Stephen Harper'), true)
      ],
      [ //5
        [
          "That's right. Unity first and above all. Period. Paragraph.",
          "*Chortle* The 'media' know nothing of the higher political arts.",
          "If our plan leaked to the press their *spin* would only get in the way."
        ],
        0,
        1,
        6,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Stephen Harper'), true)
      ],
      [ //6
        [
          "That's right. Unity first and above all. Period. Paragraph.",
          "*Chortle* The 'media' know nothing of the higher political arts.",
          "If our plan leaked to the press their *spin* would only get in the way."
        ],
        0,
        1,
        5,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Stephen Harper'), true)
      ],
      [
        //7
        ["Fear not, friends. It is I. Jason Kenney! Newly returned from having communed amongst the Tory gods."],
        0, 
        0, 
        8, 
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Chief of Staff'),true)
      ],
      [
        //8
        ["*whimper* No..."],
        0,
        0,
        8,
        () => this.f.greatTree_removeTree(11) //index to change DoFo to (kenney loss)
      ],
      [ // 9
        [
          "Today the premiers of the provinces who opposed Emperor Trudeau's carbon enchantment stand proudly before you to say the awful Carbon Tree has fallen by our hands.",
          "Canada remains open for business, with Alberta as the proud champion of Canadians' right to conduct business free of government intervention."
        ],  
        0,0,10,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("CBC Reporter"),false) }
      ],
      [ // 10
        [
          "Fellow Conservatives! The day we have long awaited is upon us.",
          "The gods show us their favour and we are called to kneel before Lady Destiny!",
          "Soon we will ride upon Queen Elizabeth II highway to engage the NDP foe. At stake is the freedom of the market and all conservatism.",
          "Now, who is with me? Fiscal, social, constitutional Conservatives?"
        ],
        0,0,11,
        () => {
          var all = {
            data:{
              'name':'All',
              'character':'All',
              'dI':3
            }
          }
          this.game.dialogue.initDialogue(null,all,false,true);
        }
      ],
      [ //11
        [
          "Behold, the enemy! Once more unto the breach, united soldiers of conservatism!"
        ],
        0,0,12,
        () => {
          // back to notley?
          this.f.battleSequence_scene2();
        }
      ],
      [ //12 Kenney speaks to self in carbonTree quest
        [
          "The mysterious figure told me I would find the clues to the correct sequence of sigils to set here in Calgary. Is the answer related to the sigils' colours, perhaps?",
          "Am I ready to return to the forest?",
          [["No.",14],["Yes.",13]]
        ],
        0,0,12
      ],
      [ //13
        [
          "To the forest!"
        ],
        0,0,0,
        () => {
          // return to forest
          this.f.greatTree_returnToForest();
        }
      ],
      [ //14
        [
          "I will resume my quest!"
        ],
        0,0,0
      ],
      [ //15
        [
          "The label on the unfinished pipeline tells me I need to acquire a valve wheel from an oil executive in Calgary.",
          "Shall I travel there now?",
          [["Yes.",16],["No.",17]]
        ],
        0,0,0
      ],
      [ //16
        [
          "Onward to Calgary!"
        ],
        0,0,0,
        () => {
          // return to forest
          this.f.pipeline_quest_returnToCalgary();
        }
      ],
      [ //17
        [
          "I will continue my quest!"
        ],
        0,0,0
      ],
      [ //18 => 'socialists everywhere!'
        [
          "The surrounding lands are crawling with socialists! I must hold my steel close."
        ],
        0,0,0
      ],
      [ //19 => start of centrist ending
        [
          "I did it! Using the power of this sword, I defeated the Invisible Hand. Is ... is this my TRUE destiny?"
        ],
        0,0,0,
        () => this.f.end_centrist_victory_enterNotley()
      ],
      [ //20
        [
          "Noooooooooooooo!!!!!"
        ],  
        0,0,20
      ],
      [ //21 => start of NDP ending
        [
          "I did it! Using the power of this sword, I defeated the Invisible Hand. Is ... is this my TRUE destiny?"
        ],
        0,0,22,
        () => this.f.end_ndp_victory_enterNotley()
      ],
      [ //22
        [
          "I held a PANCAKE ... BREAKFAST!"
        ],
        0,0,22
      ],
      [ //23
        [
          "I did it! Using the power of this sword, I defeated the Invisible Hand. Is ... is this my TRUE destiny?"
        ],
        0,0,24,
        () => this.f.end_ucp_victory_enterHarper()
      ],
      [ //24
        [
          "Like intervening in the economy when it suits us. Got it!"
        ],
        0,0,25,
        () => this.f.end_ucp_victory_enterDeities()
      ],
      [ //25
        [
          "Huzzah! I am SUCH a good conservative!"
        ],
        0,0,26,
        () => this.f.end_ucp_victory_enterManning()
      ],
      [ //26
        [
          "Ha ha! Everything's comin' up Kenney!"
        ],
        0,0,27,
        () => this.f.end_ucp_victory_enterNotley()
      ],
      [ //27
        [
          "Ha ha. Yeah...sure, sure, sure.",
          "Friends, today Alberta has chosen a future built on common sense values and has rejected the social engineering projects of the elites.",
          "They've chosen the control of their own economic destiny over the short-sighted efforts of foreign-backed interests or all-powerful deities to control it for them.",
          "Sure, I smote the deity of rigid free market ideology, but it was with a sword forged from the power of the Albertan spirit itself!",
          "And sure, I said a lot of platitudes about 'grassroots guarantees' early on in this war then quickly contradicted them...",
          "The sooner Albertans forget about that, the sooner we can get to blaming the previous government for what ails the province when I cut taxes without a plan to meet public spending needs in the face of low oil revenues...",
          "Now, let's get to building us some pipelines or buying train cars or whatever. Let's get our oil to market and the jobs a-comin' in!"
        ],
        0,0,28,
        () => this.f.end_ucp_victory_curtainDown()
      ],
      [ //28
        [
          "Long live the will of the people! Long live the Alberta Advantage!"
        ],
        0,0,0
      ]

    ],
    "Rachel Notley": [
      [
        //0
        ["Mr. Kenney.",
        "Queen Notley. When I received your request for a secret meeting, I knew at once to find you at the peak of Mount Columbia.",
        "Both of us have our eye set on Alberta's highest, greatest prize.",
        "Know this, Notley: nothing you say will dissuade me from my holy quest! The future of Alberta depends on my success, not on your kowtowing to know-nothing Emperor Trudeau.",
        "*Tsk tsk*, Kenney. By now, I've led successful negotiations with all our great province's stakeholders:"
      ],
        1,
        0,
        1,
        () => this.game.dialogue.initDialogue(null,this.game.notley,true)
      ],
      [
        //1
        ["the energy industry, environmental groups, Indigenous groups, unions ... EVEN the federal government. You should be fearful of the NDP's success. Indeed, talk is mightier than the sword.",
        "It is of no consequence! Albertans don't want you as their leader. Only through the SWORD can we restore the Alberta Advantage!",
        "Fool! Alberta has changed and only through negotiation will we and all CANADA prosper.",
        "Enough of your kumbaya talk. Why did you wish to see me?",
        "The Crystals of Confederation...",
        "I...I don't know what you're talking about.",
        "Come now. Tales of their power are not limited to Conservative lore. In fact, it's Conservative arrogance that blinds them to the Crystals' true history as the original, animating spirit of the West.",
        "Even if what you say is true, the shards of the one Crystal were long ago scattered across the province, lost to time. No premier has ever hoped to draw on their full power.",
        "Perhaps, but the time of the Prophecy draws nigh, and just as you were drawn in your quest back to Alberta, so was I. Lasting change will come to this land through the actions of one leader, so sayeth the Scriptures of Rutherford."
        ],
        1,
        0,
        2,
        () => this.f.intro_notleyMountsDragon()
      ],
      [
        //2
        ["We are fated to duel for this honour, you and I, Kenney. And uniting the Crystals is central to our shared destiny.",
        "I don't believe you.",
        "No? Then gaze upon this!"
        ],
        1,
        0,
        3,
        () => this.f.intro_notleyRevealsCrystal()
      ],
      [
        //3
        ["It can't be!"],
        0,
        1,
        4,
        () => this.game.dialogue.initDialogue(null,this.game.notley,true)
      ],
      [
        //4
        ["It is! One of the shards…and it is mine! It holds the power of Compassion and Social License. And the NDP and our growing army of adherents are close to unearthing more.",
        "The game is on, Kenney! Will the future of Alberta be one of climate change accountability, of prosperity through negotiation, of social justice?",
        "Or will it return to one of austerity, high deficits and arrogance? Abandon your quest now and Alberta will truly prosper.",
        "Onward, Prolepterya!"],
        0,
        0,
        4,
        () => this.f.intro_notleyFliesAway()
      ],
      [ //5 –– Beginning of sequence 1 speech
        [
        "Comrades of the Alberta New Democratic Party. I have good news!",
        "Today we have taken the first step in taming the chaos that has long plagued Alberta...",
        "...by sowing the seeds for greater oil and gas investment that will bring with it jobs and, just as importantly...",
        "...environmental and social justice! Increased access to healthcare for all Albertans!",
        "Under our government - the most diverse and talented Alberta has ever seen - we have led a recovery that will last generations.",
        "And a TRANSFORMATION that will last ... millennia! Ha ha ha ha!",
        "I have asked comrade Ceci to provide an update on the work of the secret Find-the-Lost-Crystals-of-Confederation taskforce."
      ],
      0,0,6,
      () => {
        // Joe Ceci moves to podium and speaks
        this.f.ndp_palace_ceciSpeaks();
      }
    ],
    [ // 6
      [
        "Hey there, guys."
      ],
      0,0,7
    ],
    [ // 7 => entry point for edmonton_ndp_cutscene
      [
        "Albertans! Your queen is of one of you!",
        "SOME leaders would insist the only pipelines that matter are on the ground!",
        "But Albertans! The pipeline MY government is building is both on the ground...",
        "...and in your hearts! From yours to mine!",
        "Now let's party like it's 2015!"
      ],
      0,0,10,
      () => {
        // end cutscen
        this.f.edmonton_ndp_cutscene_end();
      }
    ],
    [ // 8 => entry point for finalBoss_launch_battle
      [
        "Sir Kenney! You've arrived.",
        "The NDP has shown that it is no match for a united conservative party, Queen Notley. Concede defeat!",
        "The battle's not yet won. Alberta NDP forces still carry on the fight in ridings beyond Edmonton and our support remains strong here."
      ],
      1, 0, 17,
      () => {
        this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Rachel Notley"),false);
      }
    ],
    [ // 9 => entry point for palace scene 02
      [
        "Comrades! The war rages 'round us, and we have now been dealt a serious blow.",
        "The Supreme Council of Justice's decision against construction of our great pipeline means Alberta's most valuable commodity will continue to be subject to the whims of the U.S. Celestial Imperator.",
        "This is a threat to Canadian sovereignty and Canadian economic security. Today, Alberta needs action. Investors globally are terrified of the precedent this decision sets.",
        "I call on Emperor Trudeau to appeal the Supreme Council of Justice's decision.",
        "In the meantime, I am withdrawing my government's support of any further climate change enchantments introduced by his government until he takes action.",
        "And now, Finance Minister Joe Ceci has an update on our government's secret search-for-the-lost-crystals taskforce."
      ],
      0,0,9,
      () => {
        // move notley back, ceci to podium
        this.f.ndp_palace_ceciSpeaks(8);
      }
    ],
    [ //10 => entry point for trudeau-notley cutscene
      [
        "Heeeeey, macarena!"
      ],
      0,0,11,
      () => {
        // trudeau appears from behind speaker, talks
        this.f.edmonton_trudeauNotleyCutscene_trudeauAppears();
      }
    ],
    [ //11
      [
        "Emperor Trudeau?!",
        "No! Get off of the stage. You've rained on Alberta's parade enough already, not to mention me."
      ],
      0,0,12,
      () => {
        this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Justin Trudeau"),false,null,true);
      }
    ],
    [ //12
      [
        "No 'buts'!",
        "Go on. Git!"
      ],
      0,0,12,
      () => {
        // end cutscene
        this.f.edmonton_trudeauNotleyCutscene_trudeauExits();
      }
    ],
    [ //13 => marchToWar dialogue palace scene
      [
        "The UCP has claimed one of our rightful crystals, but it is no matter.",
        "The crystals we still possess in addition to the resolve of Dippers across the province are more than enough to combat the UCP threat."
      ],
      0,1,14,
      () => {
        //to sandra jansen
        var bilous = this.game.actions.getCharacter("Deron Bilous");
        bilous.data.dI = 13;
        this.game.actions.walkTo(bilous,{x:420,y:410},800,500,()=>{
          this.game.dialogue.initDialogue(null, bilous, false, true);
        });
      }
    ],
    [ //14
      [
        "Onward! To the Queen Elizabeth II highway, where the great battle awaits."
      ],
      0,0,15,
      ()=>{
        this.f.marchToWar_allNDPOut();
        this.game.actions.walkTo(this.game.player,{x:230,y:440},700,null,()=>{
          this.game.actions.walkTo(this.game.player,{x:-16,y:600},900,null,()=>{
            this.f.marchToWar_scene4_end();
          });
        });
      }
    ],
    [ //15 => battle sequence entry
      [
        "Ride, Prolepterya! Kenney is visible on the horizon. We shall meet the foe face-to-face, steel at the ready!"
      ],
      0,0,16,
      () => {
        //throw to kenney? harper?
        this.f.battleSequence_scene1();
      }
    ],
    [ //16
      [
        ""
      ],
      0,0,17
    ],
    [ //17
      [
        "Though you've infiltrated the city, I still hold captive the Invisible Hand with the crystals my party has recovered. Now witness the end of your false god!",
        "Not so fast! My new sword has been forged from the crystals the UCP has recovered. I can hold off the power of your crystals. We are nearly equally matched!",
        "As the Prophecy claims, now is the time we see which of us truly wields Alberta's power!",
        "NO!"
      ],
      1,0,18,
      () => {
        // kenney lunges 
        this.f.finalBoss_lungeForCrystal();
      }
    ],
    [ //18
      [
        "The power of our crystals! They're nearly equally matched.",
        "You won't be imposing your socialist agenda on hardworking Albertans today, Queen Notley!",
        "And YOU will be explaining to Albertans why conservative faith in the free market has once again brought them economic suffering. For your god is free and It is angry!"
      ],
      1,0,19,
      () => this.f.finalBoss_notleyRuns()
    ],
    [ //19 => notley speaks for first time in centrist ending
      [
        "I should say there's more to it, Sir Kenney. We've both felt the call to unite the crystals, but only recently did I realize the crystals were speaking with a human voice inside them!",
        "Yes! The spirit of the West itself draws us together. First to unite our own political movements, and then, unity with one another."
      ],
      1,0,20,
      () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Rachel Notley"),false)
    ],
    [ //20
      [
        "What are you saying, Queen Notley?",
        "That the crystals guide our destinies! And now, they bring us together in one last act. They draw my mind...",
        "t-to...your mind..."
      ],
      1,1,21,
      () => this.f.end_centrist_victory_callMandle()
    ],
    [ //21
      [
        "Hey, now! So does the NDP.",
        "So does...Nah. Who am I kidding?"
      ],
      1,0,22,
      () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Stephen Mandel"), false)
    ],
    [ //22
      [
        "I only drink white wine.",
        "I prefer red."
      ],
      1,1,23,
      () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Stephen Mandel"), false)
    ],
    [ //23
      [
        "Ha ha ha! My plan worked! I've made a conservative hero turn against the free market of his own will.",
        "By forcing you, Sir Kenney, to make a choice between your stated values and the certain economic chaos the vengeful and amoral Invisible Hand would have plunged Alberta into, the NDP now has a blank cheque to regulate the market with impunity.",
        "No more will the middle and working classes bear the brunt of the Invisible Hand's whims."
      ],
      0,0,24,
      () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Rachel Notley"), false)
    ],
    [ //24
      [
        "What trickery is this? Queen Notley, through your ideological madness once again you endeavour to pull the wool over the eyes of hardworking Albertans.",
        "I'M not ideological, Sir Kenney. YOU are.",
        "No. YOU'RE ideological.",
        "Am NOT!",
        "Are TOO!"
      ],
      1,1,25,
      () => this.f.end_ndp_victory_enterDeities()
    ],
    [ //25
      [
        "Excellent news! Hardworking Albertans have given their approval of our government's policies. Alberta's destiny as written in the prophecies is bright!"
      ],
      0,0,26,
      () => this.f.end_ndp_victory_enterNDPDeities()
    ],
    [ //26
      [
        "Not true. It's through collective action that Albertans helped the NDP pull off a U-turn for the province's economy and away from the regressive policies of the UCP."
      ],
      0,0,26,
      () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Margaret Thatcher"),false,null,true)
    ],
    [ //27 => ucp victory entrypoint
      [
        "Though the Alberta NDP has lost this battle, we will never concede defeat in the war.",
        "For our vision of fairness, of safety, of the kind of opportunities Albertans want and deserve will not die so long as there exists a yearning in the hearts of its people for a future built on the true meaning of justice!"
      ],
      0,0,28,
      () => {
        this.game.player.isTalking = true;
        this.game.dragon.quickExit(()=>{
          this.game.dragon.destroy();
        });
        this.game.actions.walkTo(this.game.player,{y:this.game.player.y+12},1500,200,()=>{
          this.game.actions.animateNPCs("celebrate",'NPCGroup');
          this.game.player.animations.play('laugh');
          this.game.dialogue.initDialogue(null,this.game.player,false);
        });
      }
    ]
  ],
    "Joe Ceci": [
      [ //0
        [
        "Hi-ho, comrades! As Finance Minister, I've been overseeing our government's secret efforts to reclaim the lost Crystals of Confederation.",
        "Queen Notley has made strengthening Alberta's economy central to her platform, and recovering the crystals will ensure that our government delivers on its promise to bring jobs and investment to our province.",
        "Currently, we hold the Crystal of Social License and Empathy. Naturally, as the NDP, we knew exactly where to find it.",
        "With its power, we've already captured the UCP's deity, the Invisible Hand of the Market. Our plan is to amass more crystals, thereby neutralizing this false god, and ensuring NDP control over the economy.",
        "Solidarity forever!"
        ],
      0,0,1,
      () => {
        this.f.ndp_palace01_moveTrolls();
        this.game.actions.walkTo(this.game.actions.getCharacter('Joe Ceci'),{x:327,y:464},1200,0,null,true);
      }
      ],
      [ //1
        [
          "Solidarity, my queen!"
        ],
        0,0,1
      ],
      [ //2 => entry point for guard duty -- disguised kenney engages
        [
          "What, ho!"
        ],
        0, 0, 0,
        () => {
          this.f.edmonton_clearPalaceGate();
        }
      ],
      [ //3 => entry point for guard duty -- disguised kenney engages
        [
          "Hidy-hi, stranger! Apologies, but the public is asked to remain outside. Thank you!"
        ],
        0, 0, 3
      ],
      [ //4 => Entry point for Deron running off
        [
          "Oh, I'm right behind you, Deron."
        ],
        0,0,4,
        () => {
          this.f.edmonton_clearPalaceGate();
        }
      ],
      [ //5
        [
          "Greetings, comrades.",
          "Greetings, citizen.",
          "I've just heard there is a large foodtruck fire by the legislature grounds. It's a green onion cake free-for-all!",
          "What? Oh my..."
        ],
        1,1,6,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Joe Ceci"),false,null,true);
        }
      ],
      [ //6
        [
          "Deron...",
        ],
        0,0,6,
        () => {
          var bilous = this.game.actions.getCharacter("Deron Bilous");
          bilous.data.dI = 7;
          this.game.dialogue.initDialogue(null, bilous, false, null, true);
        }
      ],
      [ //7
        [
          "My queen! We're intercepting an increasing number of messenger birds from UCP officials. They are marshalling their armies!",
          "And so it begins: the final battle.",
          "Goodness! I'd better get someone to take care of my cats..."
        ],
        1,0,8,
        () => {
          this.game.player.isTalking = true;
          this.game.player.data.dI = 13;
          this.game.dialogue.initDialogue(null,this.game.player,false,true);
          var ceci = this.game.actions.getCharacter("Joe Ceci");
          this.game.actions.walkTo(ceci,{x:220,y:430},600,200,()=>{
            this.game.actions.walkTo(ceci,{x:-36,y:600},900,0,()=>{
              ceci.kill();
            });
          });
        }
      ],
      [ //8
        [
          "Howdy, fellow comrades! Everyone's looking in fine form this afternoon.",
          "Our government continues to track down the lost Crystals of Confederation in advance as the Prophecy further reveals itself.",
          "Our work has resulted in further gains for the NDP's influence across the province, in spite of difficult headwinds.",
          "As a sidenote, this afternoon our government will celebrate the contributions of all people across Alberta in a pageant of singing and dancing unlike anything this province has seen before.",
          "Additional security around this facility is required as many in our government will be engaged in the celebrations. With the UCP foe lurking, we must protect our gains! Thank you."
        ],
        0,0,9,
        () => {
          this.game.player.isTalking = true;
         this.game.actions.walkTo(this.game.actions.getCharacter('Joe Ceci'),{x:327,y:464},1200,0,null,true);  
         // Sandra Jansen informs Notley of Singh's arrival
         var bilous = this.game.actions.getCharacter('Deron Bilous');
         bilous.data.dI = 15;
         this.game.actions.walkTo(bilous,{x:this.game.player.x-42,y:this.game.player.y},800,200,() => {
         this.game.dialogue.initDialogue('left',bilous,false);
        });
        }
      ],
      [ //9
        [
          "Everyone's having fun and all with cannabis now legal, but I don't forsee it becoming a profit centre for the government of Alberta for another couple of years."
        ],
        0,0,9
      ],
      [ //10
        [
          "Alberta beer is really, really good. I mean, REALLY!"
        ],
        0,0,11
      ],
      [ //11
        [
          "It's like we fixed the sand castle after the previous conservative government made a mess of it.",
          "And now the new conservative party wants to kick it all back down again.",
          "Do they ever build anything for anyone but their energy industry insiders?"
        ],  
        0,0,9
      ],
      [ //12 => entry point for ndp victory sequence
        [
          "My queen! The NDP armies have routed UCP forces around Edmonton and in enough suburbs of Calgary for our government to hold on to power. The battle is won!"
        ],
        0,0,13,
        //() => this.f.end_ndp_victory_enterNDPDeities()
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Rachel Notley"),false,null,true)
      ]
    ],
    
    "Chief of Staff": [
      [ //0
        [ "Sir! might I suggest forming a secret committee of volunteers and deploying them throughout the province in search of the crystals?",
        "That was originally my thought, general."
      ],
        1,0,1,
        () => this.game.dialogue.initDialogue(null, this.game.player, true)
      ],
      [ //1
        [
          'You are a master strategist, sir!',
          "What is it I've stressed repeatedly at our closed-door meetings?",
          "Grassroots on the outside, top-down on the inside, sir!"
        ],
        1,0,2,
        () => this.game.dialogue.initDialogue(null, this.game.player, true)
      ],
      [ //2
        [
          'Of taxation!'
        ],
        0,0,3,
        () => {
          const all = {
            data: {
              character: 'All',
              name: 'All',
              dI: 1
            }
          }
          this.game.dialogue.initDialogue(null, all, true)
        }
      ],
      [//3
        ["Go Leafs! Uh ... Flames!"],
        0,0,3
      ],
       [//4
        ["Sir Kenney?"],
        0,0,5,
        () => {
          this.game.player.data.dI = 7;
          this.game.dialogue.initDialogue(null, this.game.player, true)
        }
      ],
      [//5
        ["All Conservatism smiles on you, my liege. Hail this day!"
        ],
        1,0,6,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Stephen Harper'), true)
      ],
      [ //6
        ["We will await further orders from Calgary, sir!"
        ],
        0,0,6
      ],
      [ //7
        ["Good news from the front, sir! We've routed the enemy. Though their base in Edmonton remains strong, we've got them surrounded as ridings across the realm fall to us. The NDP's capitulation is all but given."
        ],
        0,0,8,
        () => {
          this.game.player.isTalking = true;
          this.game.actions.jump(this.game.player,180,200,()=>{
            this.game.dialogue.initDialogue('backward',this.game.player,false);
          });
        }
      ]
    ],
    "Stephen Harper": [
      [ //0
        ["If I may offer guidance, Jason?",
      "Of course, Master Harper."],
        1, 0, 1,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Stephen Harper'), true)
      ],
      [ //1
        ["Master Manning and I, in our consultations with the oracles, have divined a summons from the Beyond.",
          "It appears the Tory ancients are pointing to a sacred place to the west, deep in Kananaskis Country, where you ought to begin your search."
        ],
        0, 0, 2,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Preston Manning'), true)
      ],
      [ //2
        ["Through your Wisdom, you guide the fortunes of business and industry!"
        ],
        0, 0, 3,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Preston Manning'), true)
      ],
      [ //3
        ["It has been many months since I've been away, sojourning amongst the party faithful.",
        "I am pleased that I can once again offer you my help, Jason.",
        "Forever will I be lurking."
        ],
        0, 0, 3
      ],
      [//4
        [
          "So that's when Viktor Orban says, 'Yes, that IS my foot!'"
        ],
        0,0,5,
        () => { 
          const all = {
            data: {
              character: 'All',
              name: 'All',
              dI: 2
              }
            }
            // all laugh? Must create Manning and Harper laugh animations
          this.game.dialogue.initDialogue(null, all, false)
        }
      ],
      [ //5
        ["Then our reading of the ancients' signals was correct. How will they aid you in your search for the crystals, Jason?",
        "Through me they will channel their wisdom, Master Harper. They will guide me in my quest.",
        "Excellent! Go now, then. There is no time to waste. Glory to the Invisible Hand!"
        ],
        1, 0, 6
      ],
      [ //6
        ["Glory to the Invisible Hand!"
        ],
        0, 0, 6
      ],
      [ //7 => Entry point for journey to Edmonton
        [
          "Jason! You have done well. Your deeds have earned you a vaunted position amongst the Tory gods.",
          "I seek only to build a firmament on which to grow the Conservative order, Master Harper.",
          "You shall continue to have that chance in Edmonton. Bring in the volunteers."
        ],
        1,0,8,
        () => { 
          this.f.enter_companions();
        }
      ],
      [ //8 => Entry point for journey to Edmonton
        [
          "Top UCP officials Leela Aheer and Jason Nixon have offered to accompany you into Edmonton.",
          "They have been briefed on the risks. You will both need to find safe and secret passage into the NDP's stronghold then disguise yourselves as one of the city's elite, urban and liberal citizens.",
          "Choose your companion, Jason:",
          [
            ["Leela Aheer", 9],
            ["Jason Nixon", 10]
          ]
        ],
        0, 0, 8
      ],
      [ // 9
        [
          "I choose Leela Aheer. She is one of my most valuable caucus members."
        ],
        0,1,8,
        () => { 
          // choose aheer
          this.f.choose_companion("Leela Aheer");
          var leela = this.game.actions.getCharacter("Leela Aheer");
          leela.data.dI = 3;
          this.game.dialogue.initDialogue(null,leela,false);
         }
      ],
      [ // 10
        [
          "I choose Jason Nixon. His standing amongst the pragmatic, hard-working people of Alberta will ensure good fortune on my quest."
        ],
        0, 1, 9,
        () => {
          // choose aheer
          this.f.choose_companion("Jason Nixon");
          var nixon = this.game.actions.getCharacter("Jason Nixon");
          nixon.data.dI = 5;
          this.game.dialogue.initDialogue(null,nixon,false);
        }
      ],
      [ // 11 =>selection made. Harper sends you on your way.
        [
          "Very good. Now go and find a way into Edmonton. Glory to the Hand."
        ],
        0,0,13,
        () => {
          //addQuest
          var leela = this.game.actions.getCharacter("Leela Aheer");
          var nixon = this.game.actions.getCharacter("Jason Nixon");
          leela.data.dI = 6;
          nixon.data.dI = 6;
          this.game.player.addQuest('kq-q-edmontonjourney');
        }
      ],
      [ //12 => entry for return to calgary from edmonton
        [
          "We return with a new crystal! Let us heat the forge and cast a sword made with Alberta's spritiual essence.",
          "Well done! The Tory gods are truly great! With their blessings, let us marshall the armies of conservatism and launch our strike of Edmonton!"
        ],
        1,1,13,
        () => {
          this.f.marchToWar_start();
        }
      ],
      [ //13 => stock reply after edmonton journey set
        [
          "Glory to the Hand."
        ],
        0,0,13
      ],
      [ //14
        [
          "Conservatives will never compromise. Destiny be damned. I laugh in the face of Destiny!",
          "I will continue lurking. Mark my words!"
        ],
        0,0,15,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Naheed Nenshi'),false,null,true)
      ],
      [//15 entry for UCP victory ending
        [
          "I argue yes, Jason! For the rising populist tide - and we Conservatives have always been populist - decrees it so.",
          "If that is so, Master Harper, what, then, has my entire quest been in the service of?",
        ],
        1,0,16,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Stephen Harper'),false)
      ],
      [ //16
        [
          "A lesson to Conservatives to return to pragmatism and away from ideological rigidity. Our detractors - mine especially - have long accused us of being free market fundamentalists.",
          "However, I've never advocated for unrestrained markets! For in trade, it's as possible to get a bad deal as it is to get a good deal. Political leaders have the responsibility to know the difference.",
          "And Jason, you were correct to vanquish the Invisible Hand over its threats to destroy Albertans' wellbeing. Its vengefulness would have been a Very Bad Deal!"
        ],
        0,0,17,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Stephen Harper'),false)
      ],
      [ //17
        [
          "Me? Right? Of...of course I was!",
          "We cannot allow ourselves to be dominated by some uncompromising deity. The economic destiny of Alberta must be led by ..."
        ],
        0,1,18,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Stephen Harper'),false)
      ],
      [ //18
        [
          "Albertans, yes!",
          "Conservatism is not, at its core, about markets. It is about making the economy WORK.",
          "Free and open markets will generally make it work, but when they do not, as a conservative you do what you must."
        ],
        0,0,19,
        () => this.game.dialogue.initDialogue(null, this.game.player,false)
      ]
    ],
    "Preston Manning": [
      [ //0
        ["Like government waste, it is a place only a conservative's eyes can see and mind can grasp.",
      "If that is the desire of the ancients, so must I go. But first, a prayer to the Invisible Hand."],
        1, 0, 1,
        () => {
          const all = {
            data: {
              character: 'All',
              name: 'All',
              dI: 0
            }
          }
          this.game.dialogue.initDialogue(null, all, false)
          this.game.player.animations.play('celebrate');
          this.game.actions.animateNPCs('celebrate','NPCGroup');
        }
      ],
      [ //1
        ["Through Conservatives, you defend against the tyranny of government intrusion!",
      "Of regulation!"],
        1,0,2,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Chief of Staff'), true)
      ],
      [ //2
        ["Jason, Alberta needs a hero. I am honoured that you requested my counsel.",
        "Master Manning, Albertans respect your leadership. Your involvement has rallied many to our cause."],
        1,0,3,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Preston Manning"), true)
      ],
      [ //3
        ["Aye. But our coalition - blessed as it is by the might and grace of the Invisible Hand - has weaknesses.",
        "It is knit together from fiscal, social, constitutional and democratic Conservatives, to name but a few. Unity cannot be taken for granted.",
        "We must be careful not to lay bare its weaknesses for our foes to exploit. Proceed sagely, Jason."],
        0,0,4
      ],
      [//4
        ["Proceed sagely, Jason."],
        0,0,4
      ],
      [ //5 => marchToWar start
        [
          "Conservatives of Alberta: ASSEMBLE!"
        ],
        0,0,6,
        () => {
          this.f.marchToWar_scene0_end();
        }
      ]
    ],
    "All": [
      [ //0
        ["All Hail the Invisible Hand!",
      "You are the One True Market Force that binds Free-Enterprise Albertans!"],
        0, 0, 1,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Stephen Harper'), true)
      ],
      [ //1
        ["THE HAND!"],
        0, 0, 2,
        () => { 
          this.game.player.stop();
          this.game.actions.animateNPCs('walk-forward',"NPCGroup",null,true); 
          this.game.player.addQuest('kq-q-kananaskis',true);
        }
      ],
      [ //2
        ["Ba ha ha ha ha!", "?!"],
        0, 0, 2,
        () => { 
          this.f.pantheon_return_enter_kenney();
        }
      ],
      [ //3
        [
          "Aye!",
          "Albertan home schoolers! Pipelayers! Roughnecks! Car dealerships! Are you with me?",
          "Aye! Aye! Aye!",
          "Then for the glory and freedom of the Hand let us ride into combat!"
        ],
        1,0,4,
        () => {
          this.f.marchToWar_scene5_mountCar();
        }
      ]
    ],
    "UPC Soldier": [
      [ //0
        ["We give our lives to you, fearless leader Kenney!"],
        0, 0, 1
      ],
      [ //1
        ["My liege!"],
        0, 0, 2
      ],
      [ //2
        ["Conservatism is our Sun, Moon and Stars."],
        0, 0, 3
      ],
      [ //3
        ["Semper fi, Kenney!"],
        0, 0, 4
      ],
      [ //4
        ["For the Industry!"],
        0,0,5
      ],
      [ //5
        ["So sayeth the Hand!"],
        0, 0, 6
      ],
      [ //6
        ["For Martha and Henry from Rimbey!"],
        0,0,0
      ]
    ],
    "Jason Nixon": [
      [ //0
        ["Jason! You are a giant among MLAs. A true force of conservatism and an asset to the Hand.",
      "Thank you, my liege. I pledge you my steel in our battle with the NDP."],
        1, 1, 4,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Jason Nixon"),false);
        }
      ],
      [ //1 => Entry point for journey to Edmonton
        ["Ooh! Ooh! Pick me!"],
        1, 0, 1
      ],
      [ //2 => not chosen
        [
          "I will serve you when the battle comes, my liege!"
        ],
        0,0,2
      ],
      [ //3
        [
          "Have some vitamin steak to cure what ails you, sir."
        ], 
        0,0,3,
        () => {

        }
      ],
      [ //4
        ["In the meantime, I offer you my barbecuing skills as an aid in your quest. Come to my bbq to cure what ails you, sir.",
      "It's a lot better than relying on those slips of paper we call our health cards."],
      0,0,3
      ],
      [ //5
        [
          "I may be the size of an ox, but in me I possess the cunning of a jackal, Sir, Kenney, Sir!"
        ],
        0,0,5,
        () => {
           // harper now speaks
           var harper = this.game.actions.getCharacter("Stephen Harper");
           harper.data.dI = 11;
           this.game.dialogue.initDialogue(null, harper, false);
        }
      ],
      [ //6
        [
          "May our side be victorious, Sir Kenney!"
        ],
        0,0,6
      ],
      [ //7 => change costume in edmonton
        [
          "Let us don our disguises. For Edmonton is a dangerous place and it's imperative we Conservatives blend in."
        ],
        0, 1, 7,
        () => {
          //costume change function
          this.f.edmonton_initDisguises();
        }
      ],
      [ //8 => stock disguise comment 
          [
            "The workers must seize the means of reproduction!",
            "Did I say that right?"
          ],
          0,0,8
      ],
      [ //9 => convo for Edmonton crystal discovery
        [
          "Jason! I sense a pull from the jersey.",
          "It's probably trying to self-destruct, just as the Oilers always do.",
          "Nay! Come, let's dig up the ground here."
        ],
        1,1,10,
        () => {
          this.f.edmonton_crystal_uncovery();
        }
      ],
      [ //10 => scene that gets duo out of Edmonton
        [
          "Well, we've got the crystal. Let's go!"
        ],
        0,1,10,
        () => {
          //escape from edmonton
          this.f.edmonton_crystal_escape();
        }
      ],
      [ //11 => return to calgary after acquiring last crystal
        [
          "Hey"
        ],
        0,0,11
      ],
      [ //12 => entry point for crystal of social license acquisition
        [
          "I admit I have no clue what to do with this thing.",
          "Is social license even a thing?",
          "Never mind. It obviously has some form of power alien to Conservatives. Let us make haste back to Calgary, and commence with our siege!"
        ],
        1, 1, 12,
        () => {
          this.game.score("socialLicenseCrystal",-2);
          this.f.edmonton_crystal_escape();
        }
      ],
      [ //13=> convo taking you to Paula Simons after enviro rejects you
        [
          "Sir, we ought to go.",
          "But I hear whisperings that the wise Senator Paula Simons possesses great knowledge of the city.",
          "Let us seek her out."
        ],
        0, 0, 14,
        () => {
          this.f.edmonton_setPaulaQuestNode();
        }
      ],
      [ //14
        [
          "Let us seek out the wise woman Paula Simons."
        ],
        0, 0, 14
      ],
      [ //15 => after trudeau-notley photo taken
        [
          "If you had a moustache, now would be the perfect time to twirl it, sir."
        ],
        0, 0, 8,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Gabby"), false);
        }
      ],
      [ //16 => after notley dance scene
        [
          "Look at Queen Notley up there. Promising fun to her base. Fun doesn't build pipelines!",
          "Not to tidewater. No, sir.",
          "I'll show Albertans fun. I'll hold the biggest pancake breakfast ever! Pancakes are fun, right?",
          "Deliriously fun, sir."
        ],
        1,1,17
      ],
      [ //17
        [
          "We must find a way to steal one of the NDP's crystals or uncover a new one.",
          "Now where to start...?"
        ],
        0,0,17
      ],
      [ //18 => jersey pulling you comment
        [
          "Hark! I feel the jersey's power, Jason. It compels us to seek out the Legislature building to the west.",
          "Onwards, sir!"
        ],
        1,1,19
      ],
      [ //19
        [
          "To the Legislature!"
        ],
        0,0,19
      ],
      [ //20
          [
            "By the Hand! The Crystal of Edmonton is ours, and with it, the hearts of the people of this great city.",
            "Which you don't say to argue against the inherent superiority of Calgary, do you, sir?",
            "Uh, no. No, of course not. Now, let us return there at once!"
          ],
          1, 1, 20,
          () => {
            this.game.score('edmontonCrystal',1)
            this.f.edmonton_crystal_escape();
          }
      ],
      [ //21
        [
          "Is that...Queen Notley's dragon?!"
        ],
        0, 0, 0,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Derek Fildebrandt"), false)
      ],
      [ //22
        [
          "There it is! The mighty Hand, held at bay by socialist sorcery.",
          "Master Harper claims taking this crystal won't free the Hand just yet. Only by besieging Edmonton and taking control of all the crystals will the power be great enough to free the Hand.",
          "But for now, this crystal will be enough..."
        ],
        0, 1, 0,
        () => this.f.edmonton_takeSocialLicenseCrystal()
      ],
      [ //23
        [
          "The jersey's pull is drawing me to the fountain before us!"
        ],
        0,1,23
      ]
    ],
    "Voice": [
      [ //0
        ["JASON KENNEY! HERO TO ALBERTA!",
        "YOU ARE...",
        "..EXPECTED."],
        0, 0, 0
      ]
    ],
    "Margaret Thatcher": [
      [ //0
        ["Welcome and Blessings, Jason. You are in the Pantheon of Conservative Heroes.",
        "It is the rarest of honours that a Conservative, still mortal, be granted permission to enter here.",
        "But the Ethereal Council of Tories, in its wisdom, has bestowed you passage through these hallowed grounds for the situation is dire."],
        0, 0, 1,
        () => {this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Ralph Klein"),true)}
      ],
      [ //1
        ["Master deities Margaret Thatcher and Ralph Klein! I am humbled and unworthy. Is Notley's possession of one of the crystals truly that perilous?",
        "Indeed. For with that one crystal she and the NDP have captured the noblest of cosmic entities: the Invisible Hand itself!"
      ],
        1, 1, 2,
        () => {this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Ralph Klein"),true)}
      ],
      [ //2
        [
        "No... No! It can't be!",
        "Unfortunately, yes. Finding the remaining crystals now is of the greatest urgency. All Conservatism depends on it.",
        "I am your instrument, thy divine Graces. Where do I begin?"],
        1, 1, 3,
        () => {this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Ralph Klein"),true)}
      ],
      [ //3
        [
        "Through you, Kenney, will we speak to Albertans with the collected wisdom of Conservatives throughout time:",
        "Burke, Tocqueville, Locke, Smith, Bentham, Mill... from your sword their words will be transformed into action...",
        "You are Alberta's only hope."
        ],
        0,0,4,
        () => {this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Margaret Thatcher"),true)}
      ], 
      [ //4
        [
          "Yes. Of course I am! It is my destiny!",
          "Go now, Kenney. Time is of the essence. All Conservatism is counting on you.",
          "I will not fail you, Your Most Divine Ones. Glory to the Hand!",
          "Yes, Glory to the Hand."
        ],
        1,1,5,
        () => {this.f.pantheon_endScene()}
      ],
      [ //5
        [
          "Go now, Kenney. Time is of the essence. All Conservatism is counting on you.",
          "I will not fail you, Your Most Divine Ones. Glory to the Hand!",
          "Yes, Glory to the Hand."
        ],
        1,0,5,
        () => { this.f.pantheon_endScene() }
      ],
      [ //6 => entry point for two-crystal summons
        [
          "Jason! You have recovered two crystals and as our battle against the NDP draws nearer, the odds increase in our favour.",
          "But there is more to be done."
        ],
        0,0,7,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Ralph Klein"),false) }
      ],
      [ //7
        [
          "The High Council of Tories requires that you seek out a crystal from within the NDP's stronghold.",
          "You must either unearth a new crystal from under Queen Notley's nose or steal one she already possesses.",
          "From the crystals you've found you shall forge a powerful sword to combat the socialist scourge. It will have no equal!"
        ],
        0,0,8,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ralph Klein"), false)
        }
      ],
      [ //8
        [
          "Take your leave now, Jason. The Gods of Conservatism go with you.",
          "In the name of the Hand!"
        ],
        1,0,8,
        () => { 
          this.f.return_kenney_to_base_before_edmonton();
         }
      ],
      [//9
        [
          "This is not amusing. The Conservative gods are MOST upset with this outcome!"
        ],
        0,0,10,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Ralph Klein"),false,null,true)

      ],
      [//10 => thatcher entry point for ndp victory ending
        [
          "The loss of the Invisible Hand is most upsetting, and the loss of Alberta sets the conservative agenda back. Sir Kenney, you have failed us."
        ],
        0,0,11,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Ralph Klein"),false,null,true)
      ],
      [ //11
        [
          "Bullocks! The virus of collectivism will be the death of prosperity and of families."
        ],
        0,0,12,
        //() => this.f.end_ndp_victory_langSpeaks()
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Rachel Notley"),false,null,true)
      ],
      [ //12
        [
          "Hmph. You turn if you want to. The lady's not for turning."
        ],
        0,0,12,
        () => this.f.end_ndp_victory_langSpeaks()
      ],
      [ //13 => ucp victory entry point
        [
          "Like advocating for supply management for dairy farmers, for whom the sector is rural communities' economic backbone."
        ],
        0,0,14,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Ralph Klein"),false,null,true)
      ]
    ],
    "Ralph Klein": [
      [ //0
        ["I can't believe it! I gave up looking for the crystals while I was still leader.",
        "But then, I didn't need 'em..."],
        0, 0, 1,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Margaret Thatcher"),true) }
      ],
      [ //1
        ["The NDP are lunatics! I'm so angry I could smack another page."],
        1, 0, 2,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Margaret Thatcher"),true) }
      ],
      [ //2
        ["The Gods of Conservatism will be with you in spirit as you seek the crystals. We will offer you what guidance we can."],
        0, 0, 3,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Margaret Thatcher"),true) }
      ],
      [ //3
        ["Okay, okay... Get a room if you're gonna wax on about it.",
        "Apologies, my Grace."
        ],
        1, 0, 4,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Margaret Thatcher"),true) }
      ],
      [ //4 => entry point for two-crystal summons
        [
          "Your Graces! What must I do next?",
          "We're sending you to Edmonton. We know it's a rotten place, infested with twitchy-eyed, machete-wielding savages, but the mission is critical."
        ],
        1, 1, 5,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Margaret Thatcher"),true) }
      ],
      [ //5
        [
          "A brilliant strategy by the High Council, your Grace!",
          "And once a third crystal is in your possession, you should be ready to finally besiege Edmonton once and for all, freeing the Invisible Hand and reclaiming conservatism's rightful place at the seat of power in Alberta.",
          "The UCP's steel is prepared!"
        ],
        1,1,6,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Margaret Thatcher"), true)
        }
      ],
      [ //6
        [
          "Compromise with OTTAWA, more like. You're going to sell Alberta down the river. Harrumph!"
        ],
        0,0,7,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Stephen Mandel"), false,null,true)
      ],
      [ //7 => entry point for Klein ndp victory ending
        [
          "I knew we shouldn't've sent a second-rate Eastern bum to do a REAL Albertan's job."
        ],
        0,0,8,
        () => this.f.end_ndp_victory_enterCeci()
      ],
      [ //8
        [
          "Or generously subsidising the energy industry, the engine of the Alberta Advantage!"
        ],
        0,0,9,
        () => {
          this.game.player.isTalking = true;
          this.game.actions.jump(this.game.player,180,300,() => {
            this.game.dialogue.initDialogue(null, this.game.player, false)
          });
        }
      ]
    ],




    // -------------------------------------------- calgary-01 ----------------------------------------------------//

    "Bartender": [
      [//0
        [
          "Craft beers? Yeah, we've got 'em. And they're better than anything on offer in Edmonton.",
          "In fact, everything here in Calgary is better than what you'll find in Edmonton. You can take that to the bank."
        ],
        0,0,0
      ],
      [//1 // entry point for ratKing quest switched from Braid
        [
          "Argh! Another batch of artisanally made craft-brews ruined on account of them rats!",
          "You seem frustrated, my good man. Are NDP policies laying low your independent business?",
          "Uh, no. It's the rats. The rats! They've come back to Alberta and keep eating all my supplies of hops."
        ],
        1,0,2,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Bartender"),true)
        }
      ],
      [ //2
        [
          "How am I to brew offensively bitter craft IPAs without my hops? I need hops!",
          "Ungodly amounts of hops!",
          "But the rats are taking it all for themselves and their king.",
          [["Tell me about your hops.",3],["Tell me about the rat king.",4]]
        ],
        0,0,3
      ],
      [ //3
        [
          "Oh my goodness! My customers can't get enough of it. All they want are IPAs, IPAs. The more bitter the better.",
          "If this is the desire of Albertans then it is the will of the Invisible Hand! Supplying your customers with the product they seek is the reasonable course of action! ",
          "Uh, thanks, dad."
        ],
        1,0,4,
        () => this.game.score("bartender hops",-1)
      ],
      [ //4
        [
          "As any Albertan is proud to tell you, this province has been rat-free since the 1950s.",
          "The government - and I know you UCPers hate government but, by golly, this was a humdinger of a public works initiative - ...",
          "... developed an early-warning system along the eastern edge of the province staffed by agents tasked with clearing out rat nests wherever they found them.",
          "Needless to say, the program's been a success until now."
        ],
        0,0,5,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Bartender"), true)
        }
      ],
      [ //5
        [
          "I will defeat this Vermin King!"
        ],
        0,1,6,
        () => { 
          this.f.ratKing_addMapTile();
          this.game.player.addQuest('kq-q-ratking');
          this.game.actions.removeFromCachedObject("Bartender", "questNodeId", "kq02-calgary-01");
          
        }
      ],
      [ //6
        [
          "Hey, thanks for being willing to save my hops.",
          "The whole of the craft beer business thanks you."
        ],
        0,0,6
      ]
    ],

    "Roy": [
      [//0
        [
          "The Stampede's a-comin' I'm gonna get shitfaced in the most family-friendly way."
        ],
        0,0,0
      ]
    ],

    "Ava": [
      [//0
        [
          "Albertans owe their prosperity to the Industry and the Invisible Hand, who blesses it with good fortune.",
          "Except when it doesn't. I could really go for it doing that less."
        ],
        0,0,0
      ]
    ],

    "Sophia": [
      [//0
        [
          "I've been hearing rumours about rats having returned to Alberta.",
          "And no, that's not some coded joke about Kenney and the gang of professional politicians from Ontario he's brought with them.",
          "But if it were, it'd be accurate."
        ],
        0,0,0
      ]
    ],

    "Ravi": [
      [//0
        [
          "I worry about what the NDP warlord John Horgan from the province of British Columbia will do to our Industry.",
          "Of late, he's been leading raiding parties into Alberta, tearing up pipelines. ",
          "Someone's GOT to stop him!"
        ],
        0,0,0
      ]
    ],


    "William": [
      [//0
        [
          "You'd think the socialist governments running Alberta and British Columbia could work out their feud and get the pipelines back on track.",
          "It's really STALIN' the flow of oil! Ha! Get it?",
          "I'm using that one at the next Manning Conference stand-up night."
        ],
        0,0,0
      ]
    ],


    "Owen": [
      [//0
        [
          "Ugh! Trudeau! I hear that name and I break into a cold rage. And now he owns our pipeline!",
          "Well, no, technically it's the federal government that owns the pipeline. But use that irrational anger to support the UCP!",
          "Oh, I will, Mr. Kenney. You can count on me!"
        ],
        1,0,0
      ]
    ],

    "Liam": [
      [//0
        [
          "So I work with this guy Ethan whose new truck was running suspiciously silently, y'know?",
          "So I ask him, 'Ethan, what's the deal with your truck?'",
          "Turns out it was a hybrid. Half-electric. Can you believe the nerve of that guy?"
        ],
        0,0,0
      ]
    ],


    "Naheed Nenshi": [
      [ //0
        [
          "A fine Calgary morning to you, Jason. Would you like to take a quiz for my YouTube show? The prize is passage west into the Rocky Mountains.",
          [["Yes, I would.",9],["Not today, Nenshi.",10]]
        ],
        1,0,0
      ],
      [ //1
        [
          "Quiz question slot" // index for quiz questions
        ],
        0,0,1
      ],
      [ //2
        [ 
          "Quiz CORRECT answer slot" // index for CORRECT quiz question answer
        ],
          0,0,1,
          () => { this.f.quiz_question(1) }
      ],
      [ //3
        [ 
          "Quiz INCORRECT answer slot" // index for INCORRECT quiz question answer
        ],
          0,0,1,
          () => { this.f.quiz_question(1) }
      ],
      [ //4
        [ 
          "Congratulations! You got enough answers correct! Here's your pass west and I've informed the park rangers to let you through.",
          "And despite the fact that I'm opposed to just about everything you stand for, Jason, good luck on your quest!" // quiz over - win
        ],
          0,0,13,
          () => { 
            this.game.score("quiz",3)
            this.f.calgary_02_clearWay(); this.f.nenshi_questComplete() 
          }          
      ],
      [ //5
        [ 
          "Oh, that's too bad. You didn't answer enough questions correctly to merit a pass into the Rockies.",
          "But, tell you what: I'm a generous guy. I see no reason why I can't cut you a break. Divine Destiny is on your side, or whatever you've been telling people.",
          "Here's your pass into the Rockies. Good luck!" // quiz over - loss
        ],
          0,0,13,
          () => {
            this.game.score("quiz",-2)
            this.f.calgary_02_clearWay();
            this.f.nenshi_questComplete()
          }
      ],
      [ //6 => entry point if player has quest
        [
          "Oh, hi there, Jason. How are you this fine Calgary morning?",
          "Mayor Nenshi! I seek passage west into the Rocky Mountains.",
          "In that case, have I got an offer for you! First prize on my YouTube show's quiz segment is passage into the Rockies. Interested?",
          "Very well.",
          "The first of five questions:"
        ],
        1,0,1,
        () => {
          this.f.quiz_question(this.game.actions.randomQuizQ())
        }
      ],
      [ //7 => 'secret quest'
        [
          "Is that so? Would you mind telling my audience what that is? We're currently live on my YouTube show.",
          "Huh? What?!",
          "Kidding! Kidding! Mayor humour. Ha ha!"
        ],
        1,0,11,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Naheed Nenshi"),false) }
      ],
      [ //8 => 'youTube show'
        [
          "Why, yes! Would you like to appear on my quiz segment? The prize is passage west into the Rocky Mountains.",
          [["Yes! I may require that.",9],["I don't have time for games.",10]]
        ],
        1, 0, 8
      ],
      [ //9 => 'I will do quest'
        [
          "Alright then! We're live now with Sir Jason Kenney, leader of the UCP, who's here with me to answer five questions in the hopes of securing passage into the Rockies.",
          "First question:"
        ],
        0,0,9,
        () => {
          this.f.quiz_question(this.game.actions.randomQuizQ())
        }
      ],
      [ //10 => 'not now'
        [
          "That's too bad. The mountains are hugely popular here in Calgary. It would be a shame to miss them.",
          "Some other time."
        ],
        1,0,12,
        () => {
          // set diCache for Nenshi to 12
          this.game.actions.setCharacterDICache('Naheed Nenshi', 12, "kq02-calgary-01");
        }
      ],
      [ //11 => 'kidding. mayor humour'
        [
          "But seriously. I'm curious whether you'll do a quiz live on my show. Five questions. The prize is passage west into the Rocky Mountains.",
          [["Yes! I may require that.",9],["I don't have time for games.",10]]
        ],
        1,0,11
      ],
      [ //12 => 'come back anytime'
        [
          "Welcome back, Jason. Ready to take my quiz?",
          [["I will take your quiz.",9],["I still don't have time for games.",10]]
        ],
        1,0,12
      ],
      [ //13 => after quiz has been completed
        [
          "Good luck on your quest, Jason.",
        ],
        1, 0, 15
      ],
      [ //14 => nenshi speaks in centrist victory sequence
        [
          "Stephen, I've got my finger on the pulse of Albertans and I think they'd be happy to work with you!",
        ],
        1, 0, 14,
        () => this.f.end_centrist_victory_mandelEnd()
      ],
      [ //15
        [
          "You'd better get all your business in downtown Calgary done before 5pm when the whole place shuts down.",
          "I mean, seriously, what's up with that? Ha ha!"
        ],
        0,0,15
      ]
    ],

    "Empress Bovina": [
      [ //0
        [
          "Moo."
        ],
        1, 0, 0
      ]
    ],

    "Gord": [
      [ //0
        [
          "I tell visitors Alberta isn't the redneck province they think it is. We're as globalised as anywhere else.",
          "I know some cattleranchers who dig listening to K-pop on the job."
        ],
        0,0,0
      ]
    ],

    "Amelia": [
      [ //0
        [
          "Does the Trans Mountain purchase prove the NDP can get things done?",
          "I will resolutely deny whatever evidence suggests they can. UCP 2019!"
        ],
        0,0,0
      ]
    ],

    "Ted": [
      [ //0
        [
          "The nanny state wants me to force me to put on a helmet while hunting on my ATV. Can you believe it?",
          "As a self-sufficient adult, I'll do whatever the hell I like."
        ],
        0,0,0
      ]
    ],

    "Lucas": [
      [ //0
        [
          "I hate to say it, but Trudeau's pipeline purchase leaves Alberta and all of Canada better off.",
          "I'm seriously considering conscription into Queen Notley's army."
        ],
        0,0,0
      ]
    ],

   "Avery": [
      [ //0
        [
          "They say Alberta's chinooks bring warm air to the rest of Canada.",
          "I like to think it brings with it common sense, as well."
        ],
        0,0,0
      ]
    ],

    "Sheila": [
      [ //0
        [
          "MY privilege looks a lot like hard work and good choices!"
        ],
        0,0,0

      ]
    ],

    "Gerald": [
      [ //0
        [
          "I hear the rogue air-pirate Fildebrandt has been causing a ruckus all up and down Alberta.",
          "Good on him! That there's a lad who's got the common touch that will shake things up."
        ],
        0,0,0
      ]
    ],

    "Charlotte" : [
      [//0
        [
          "I'm so, SO sorry about my truck! It broke down right in the middle of street. This is super embarrassing..."
        ],
        0,0,0
      ]
    ],

    "Belinda": [
      [ //0
        [
          "K.d. Lang's a legend."
        ],
        0,0,1
      ],
      [ //1
        [ 
          "Ever fed a Timbit to a bear?"
        ],
        0,0,0
      ]
    ],

    "Anju": [
      [ //0
        [
          "Yee-haw!",
          [["Yee-haw!",1],["You mean 'yahoo,' right?",2]]
        ],
        0,0,0
      ],
      [ //1
        [
          "Mmm...nope. That was a test and you, sir, have failed."
        ],
        0,0,3,
        () => this.game.score("yahoo",-1)
      ],
      [ //2
        [
          "Mm-hmm. You have chosen ... wisely."
        ],
        0,0,3,
        () => this.game.score("yahoo",1)
      ],
      [ //3
        [
          "I'm on Team Alberta! Are YOU?"
        ],
        0,0,3
      ]
    ],

    "Richard Starke" : [ // MUST set boolean when Kenney speaks with Starke
      [ //0
        [
          "Richard Starke! You're a long way out from Vermillion-Westminster.",
          "Good day, Kenney. You know I'm leaving politics, but that I'll carry the PC name on in my heart.",
          "You mean - *chuckle* - the PC name that belongs to the United Conservative Party?",
          "I think we can both agree that under you there's little vestige of anything 'progressive' about the UPC. I will dutifully carry the banner of the PC legacy.",
          [["Well, we've all got to live for something.",1],["It's time you stopped using that name.",2]]
        ],
          1,1,0
        ],
        [ //1
          [
            "We are men who both value principles. I respect that in a warrior.",
            "You mean the principles that enable you to look past your party faithful hurling nasty epithets at fellow Conservatives who dare speak out against you?",
            "I have created a big-tent party, Sir Richard. I deign not control what can and cannot be said by members of a grassroots movement.",
            "Horse manure. You mean to say you refuse to hold them to account, more like. Face it, you've opened a nasty can of worms in pursuit of victory."
          ],
          1,1,5,
          () => {
            this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Richard Starke"),false);
          }
        ],
        [ //2
          [
            "The Progressive Conservatives are no more, Sir Starke. You insist on playing courtier to a corpse, one Albertans deposed and buried in the ash heap of history.",
            "By insisting there is value still in the PC name proves you're a fool.",
            "But I can revoke your right to the name anytime I wish as I am now the leader of what the PCs once represented in this province."
          ],
          0,1,5,
          () => {
            this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Richard Starke"), false);
          }
        ],
      [ //3 => entrypoint for edmonton journey convo if Kenney has spoken to Starke already
        [
          "Sir Kenney, I told you my mind wouldn't change. It still hasn't.",
          "I haven't come to ask you to join us, Sir Starke. By the Hand, no! I seek your help.",
          "My help?! I wouldn't help the UCP for all the oil in the world!",
          [["The NDP seek to destroy the Invisible Hand!",7],["I'll force you to stop using the PC name.",8],["We have nothing more to discuss.",9]]
        ],
        1,0,3
      ],
      [ //4 => entrypoint for edmonton journey convo if Kenney has not yet spoken to Starke
        [
          "Sir Starke, I come seeking your help.",
          "What might that be, Sir Kenney? I swore I'd never help the UCP, which is why I continue to campaign under the PC name.",
          "Admit that the PC legacy is tarnished, Sir Starke! It will never again be a viable party in Alberta. Join the UCP and your voice will be heard.",
          "It's about principles, Sir Kenney. I have them. You don't. That's what stands between me and joining you.",
          "But what of mutual interests? Can I not persuade you on those grounds?",
          [
            ["The NDP seek to destroy the Invisible Hand!", 7],
            ["I'll force you to stop using the PC name.", 8],
            ["Perhaps we have nothing more to discuss.", 9]
          ]
        ],
        1,1,4
        //() => { this.f.starke_edmonton_path() }
      ],
      [ //5 => nasty can of worms in pursuit of victory
        [
          "My continued use of the PC name is a stand for the principles of PROGRESSIVE conservatism. I'm happy to say I have no place amongst the toxic cesspool of your party.",
          "As you wish, Richard. I maintain there is always a place for you should your mind change.",
          "It won't. Good day."
        ],
        1, 0, 6,
        () => {
          // talked to starke
          this.game.globalAchievements.starkeConvo = true;
        }
      ],
      [ // 6
        [
          "My mind won't change, Sir Kenney. Good day."
        ],
        0,0,6
      ],
      [ // 7 => choose starke path. NDP seeks to destroy invisible hand
        [
          "The Hand? What? How!?",
          "They seek the lost Crystals of Confederation. With their power the NDP would bring untold levels of regulation to Alberta's market.",
          "But free-market principles are what have made Alberta great...",
          "Indeed. The UCP and NDP are in a race to find more of the lost crystals. Time is of the essence!"
        ],
        1,1,11,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Richard Starke"), false);
        }
      ],
      [ // 8 => threaten starke with name
        [
          "You're a nasty piece of work, Sir Kenney. This is the very kind of personal-vendetta politics that turned me off of you.",
          "Success in politics is attained only through the willingness to seize every available opportunity, Sir Starke. And right now, I have all the leverage over you. Now what do you say?",
          "Humph. Very well, KENNEY."
        ],
        1,0,12,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Richard Starke"), false);
        }
      ],
      [ // 9 => nothing more to discuss
        [
          "Then be on your way."
        ],
      1,0,10
      ],
      [ // 10 
        [
          "You've returned. Have you something to say to me?",
          [
            ["The NDP seek to destroy the Invisible Hand!", 7],
            ["I'll force you to stop using the PC name.", 8],
            ["Never mind.", 9]
          ]
        ],
        1,0,10
      ],
      [ // 11
        [
          "I am asking for your help. Not for the UCP, but for all Conservatism. We need a way into Edmonton where more crystals are to be found.",
          "Yes...yes. The situation sounds grave. I will put aside my doubts about you and your party, which, though great, are nothing compared to the threat of government intervention of our markets."
        ],
        1,1,12,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Richard Starke"), false);
        }
      ],
      [ // 12
        [
          "The PC party had a network of tunnels built between Calgary and Edmonton long ago.",
          "You will find the entrance inside City Hall. Follow the tunnels to an underground lake that feeds into the Bow River, from which you can enter Edmonton undetected."
      ],
        0,0,13,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Richard Starke"), false);
        }
      ],
      [ // 13
        [
          "Thank you, Sir Starke. The PC legacy of abuse of taxpayer dollars will surely aid me in my quest to depose the very problem its arrogance helped create.",
          "Hmph. Don't get saucy.",
          "The Tory gods smile on you, Sir Starke. Glory to the Hand!",
          "*Sigh* Yeah, yeah... the Hand..."
        ],
        1,1,14,
        () => { this.f.starke_edmonton_path() }
      ],
      [ // 14
        [
          "Be on your way, Sir Kenney."
        ],
        0,0,14
      ]
  
    ],


    "Arundeep": [
      [//0
        [
          "Markets have been behaving strangely as of late. Oil prices are all over the map.",
          "It's anybody's guess what will happen next."
        ],
        0,0,1
      ],
      [//1
        [
          "What's going on with the markets?"
        ],
        0,0,1
      ],
    ],

    "Sandra Jansen": [
      [ //0
        [
          "Queen Notley!",
          "Minister of Infrastructure, Sandra Jansen. Since you left the discredited Progressive Conservative party and joined us, you have fought ably and nobly for the NDP cause.",
          "That snake Jason Kenney has hollowed out the centre of politics in this province, my queen. Callous and opportunistic, he brings discord to Alberta.",
          "Indeed. You are a fighter, comrade Jansen. For that reason, I made you chief of the Alberta NDP Order of the Valkyrie, charged with securing our government's position in Calgary.",
          "I relish the battle, my queen. I will grind the UCP foe into the dirt with the heel of my Stetson and my lickspittle former colleagues in the PC party will rue the day Kenney arrived on their doorstep.",
          "Very good, comrade Jansen."
        ],
        1,0,1
      ],
       [ // 1
        [
          "My lickspittle former colleagues in the PC party who capitulated to the UCP will rue the day Kenney arrived on their doorstep."
        ],
        0,0,1
       ],
       [ //2 => talks to notley during marchToWar sequence
          [
            "My queen! We may have the advantage. And if we press the attack, we may well take parts of Calgary.",
            "Our governments' hold on power would then most certainly be secured."
          ],
          0,0,3,
          () => {
            this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Sandra Jansen"),false,true);
          }
       ],
       [ //3
          [
            "That is heartening news, comrade Jansen. Let us rally our troops."
          ],
          1,1,4,
          () => {
            this.game.player.data.dI = 14;
            this.game.dialogue.initDialogue(null,this.game.player,false,true);
          }
       ],
       [ //4
          [
            "Queen Notley. The NDP Grand Commissar himself, Jagmeet Singh, has arrived and seeks an audience with you.",
            "He's at the other end of the hall.",
            [ ["Unnnngggghhhh...",5],["Very well.",6] ]
          ],
          0,0,4
       ],
       [ //5
          [
            "I'll go. What choice do I have?"
          ],
          1,1,7,
          () => this.game.score("NotleySinghMeet",1)
       ],
       [ //6
          [
            "Very well. I'll meet with him on my way out the Pride festivities."
          ],
          1,1,7,
          () => this.game.score("NotleySinghMeet",-1)
       ],
       [ //7
          [
            "We will fight, fight, fight for the NDP!"
          ],
          0,0,7
       ],
       [ //8
          [
            "Our battle and ultimate victory against the racists, misogynists and bullies of the UCP will be our finest moment!"
          ],
          0,0,7
       ]
    ],

    "Shannon Phillips": [
      [ //0
        [
          "Queen Notley. Solidarity forever!",
          "Solidarity, comrade Phillips. As my Minister of Environment and Parks and Minister Responsible for the Climate Change Office, you have fought many battles.",
          "I do it in the name of solidarity, my queen. Gaia provides Albertans with health and prosperity, but so does Industry. We must develop our resources through consultation and negotiation to stimulate investment, while exercising responsible stewardship of the environment.",
          "Very good, comrade Phillips.",
          "UCP forces have stepped up their attacks as of late, but our lines are holding. The Climate Leadership Plan supports our government's goal of recovering the crystals, thereby diversifying our economy, creating jobs and improving Albertans' health.",
          "I have faith in you, comrade."
        ],
        1, 0, 1
      ],
      [ //1
        [
          "Solidarity forever, queen Notley!"
        ],
        0,0,1
      ],
      [ //2
        [
          "Finally, the mask has slipped with respect to what Jason Kenney wants to do to the people of this province."
        ],
        0,0,3
      ],
      [ //3
        [
          "Kenney does not want to talk to Albertans about doing things like firing pregnant women.",
          "He does not want to talk to Albertans about restoring an employer's ability to fire someone who needs to take time off to care for a child with cancer."
        ],
        0,0,2
      ]
    ],

    "Deron Bilous": [
      [ //0
        [
          "Economic Development and Trade Minister Deron Bilous. How goes the economic diversification initiative that will finish off the Invisible Hand once and for all?",
          "My queen! My ministry continues to work hand-in-hand with the secret crystal taskforce to secure the lost crystals and bring the Conservatives to their knees.",
        ],
        1,1,1,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Deron Bilous'),false);
        }
      ],
      [ //1
        [
          "We will expose the Conservatives' wrong-headed approach to economic management once and for all.",
          "Albertans will embrace a thoughtful approach to our economy, with a regulatory scheme developed in consultation with the province's top business leaders and small enterprises alike."
        ],
        0,0,2,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Deron Bilous'), false);
        }
      ],
      [ //2
        [
          "And what of our efforts to combat British Columbia's chief warlord John Horgan and his band of marauders obstructing pipeline development on our western border?",
          "Our efforts on that front are slowed by his government's possession of the Crystal of Infrastructure Projects, my queen. From this crystal flows much of the magic from which we Albertans draw our prosperity and his SHITHEAD government is using it against us!",
           "Comrade Bilous! Mind your tongue!",
           "Apologies, my queen. My passion to win this battle and build the Trans Mountain pipeline is overwhelming, and the war our supposed New Democrat fellows in British Columbia wage on us has me fiercely dismayed.",
           "I understand, comrade. But leave it to me to deal with the warlord Horgan and the leader of our federal wing, the Emperor Contender Jagmeet Singh. Their lack of solidarity with Alberta's interests will be their undoing."
        ],
        1,1,3,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Deron Bilous'), false);
        }
      ],
      [ //3
        [
         "The war our New Democrat 'allies' in B.C. and on the federal level has me fiercely dismayed."
        ],
        1,0,3
      ],
      [ //4 => entry point for guard duty -- disguised kenney engages
        [
          "We stand on guard for the NDP! None shall pass!"
        ],
        0,0,4
      ],
      [ //5
        [
          "Greetings, comrades!",
          "Comrade...",
          "My stars! I've just heard there is a foodtruck fire by the legislature grounds. It's created a green onion cake free-for-all!",
          "Are...are you serious?"
        ],
        1,1,6,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Deron Bilous'),false,null,true);
        }
      ],
      [ //6
        [
          "Joe, I'm sorry. There are free all-I-can-eat green onion cakes.",
          "Everything that I am has culminated in this moment. I don't care what happens after this. I have to go."
        ],
        0,0,6,
        () => {
          var ceci = this.game.actions.getCharacter("Joe Ceci");
          ceci.data.dI = 4;
          this.game.dialogue.initDialogue(null,ceci, false, null, true);
        }
      ],
      [ //7
        [
          "Oh, you don't have to ask me twice. I'd give up everything I am for those delicious fried treats."
        ],
        0,0,7,
        () => this.f.edmonton_clearPalaceGate()
      ],
      [ //8
        [
          "Kenney would force changes through quickly so opponents have no time to mobilize against them.",
          "Isn't careful deliberation what democracy is for?"
        ],
        0,0,9
      ],
      [ //9
        [
          "Overturning the public sector through massive jobs cuts and the creation of state-owned enterprises to deliver government services with a focus on efficiency and profit..",
          "…always works better on paper than in practice."
        ],
        0,0,8
      ],
      [ //10
        [
          "Shout out to Take 5 Bakery. The best donuts in Edmonton! ALRIIIIGHT!"
        ],
        0,0,11
      ],
      [ //11
        [
          "The hypocrisy of the the B.C. government encouraging LNG development over our pipelines is too much!",
          "LNG will bring a 174% increase to tanker traffic to Kitimat. So much for their concern about whales..."
        ],
        0,0,12
      ],
      [ //12
        [
          "Ukraine is tops!"
        ],
        0,0,10
      ],
      [ //13 => talks to notley during marchToWar sequence
          [
            "My queen! We may have the advantage. And if we press the attack, we may well take parts of Calgary.",
            "Our governments' hold on power would then most certainly be secured."
          ],
          0,0,14,
          () => {
            this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Deron Bilous"),false,true);
          }
       ],
       [ //14
          [
            "That is heartening news, comrade Bilous. Let us rally our troops."
          ],
          1,1,4,
          () => {
            this.game.player.data.dI = 14;
            this.game.dialogue.initDialogue(null,this.game.player,false,true);
          }
       ],
       [ //15
          [
            "Queen Notley. The NDP Grand Commissar himself, Jagmeet Singh, has arrived and seeks an audience with you.",
            "He's at the other end of the hall.",
            [ ["Unnnngggghhhh...",16],["Very well.",17] ]
          ],
          0,0,4
       ],
       [ //16
          [
            "I'll go. What choice do I have?"
          ],
          1,1,8,
          () => this.game.score("NotleySinghMeet",1)
       ],
       [ //17
          [
            "Very well. I'll meet with him on my way out the Pride festivities."
          ],
          1,1,8,
          () => this.game.score("NotleySinghMeet",-1)
       ]
    ],

    "Danielle Larivee": [
      [ //0
        [
          "Children's Services Minister Larivee. You oversee a difficult portfolio. You command my respect and that of this entire government.",
          "Thank you, my queen. I ...",
          "You seem troubled, comrade. What is it?",
          "Well, I've been wondering...",
          "You can ask anything of your queen. We are an egalitarian government.",
          "That ... that's just it, though. You're the queen of a purportedly non-hierarchical collective. So what is it? Are we monarchist or socialist?",
          "Oh, ho ho, comrade. You lack imagination! As your queen, I merely offer my guidance, to you, my ministers and comrades, in the execution of the duties to which you report to me in a spirit of allegiance and solidarity.",
          "That makes no sense, my queen.",
          "Ho ho, comrade, comrade...you're making my head hurt. Carry on, but rest assured that, so long as you stick to the script I give you, you're always invited to question this government.",
          "Er, uh, yes, my queen."
        ],
        1, 1, 1
      ],
      [ //1
        [
          "Solidarity forever, my ... queen."
        ],
        0,0,1
      ],
      [ //2
        [
          "I shudder to think of what a UCP government will do to essential public services the most vulnerable in our province depend on."
        ],
        0,0,3
      ],
      [ //3
        [
          "I'm having conversations with everyday Albertans about their province's future!"
        ],
        0,0,2

      ]
    ],

    "David Shepherd": [
      [ //0
        [
          "My queen! I've written you a song for the upcoming Pride celebrations.",
          "Comrade Shepherd, as the representative for the constituency of Edmonton-Centre you oversee the morale of our stronghold, the capital. Your talent will carry our base through the battles that lie ahead.",
          "Thank you. Would you like to hear what I've written?",
          [["Please.",1],["Not now, comrade.",2]]
        ],
        1, 0, 0
      ],
      [ //1
        [
          "*clears throat*",
          "Oooooh, Aaaaaaah, Waaaaaaa....",
          "Baby, baby, baby...",
          "Ooooh, Queen Notley, yeah...",
          "Baby, baby, yeah...."
        ],
        0,0,3,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('David Shepherd'),false);
        }
      ],
      [ //2
        [
          "I will continue to develop the song, my queen."
        ],
        0,0,2
      ],
      [ //3
        [
          "What do you think?",
          [["Very good, comrade!",4],["It needs some work.",5]]
        ],
        0,0,3
      ],
      [ //4
        [
          "Thank you, my queen. I will continue to develop the song."
        ],
        0,0,2,
        () => this.game.score("shepherdSong",-1)
      ],
      [ //5
        [
          "Thank you, my queen. I will find a new direction."
        ],
        0,0,2,
        () => this.game.score("shepherdSong",-1)
      ],
      [ //6
        [
          "I believe in music as a force for social change!"
        ],
        0,0,7
      ],
      [ //7
        [
          "Climate action isn't free. The cost must be covered by growing our economy and creating jobs.",
          "That's why Trans Mountain is essential!"
        ],
        0,0,6
      ]
    ],

    "Shaye Anderson": [
      [ //0
        [
          "Queen Notley!",
          "Municipal Affairs Minister Anderson. The battle in the rural districts of our realm has been arduous. Though the prospects are grim, your continued enthusiasm has been a bright spot for our government.",
          "I credit my Samson-like resolve to my beard, my queen. Have you seen my beard?",
          "Uh, yes, comrade Anderson. It's on your face. I'm looking right at it.",
          "It's really big.",
          "Yes, it is.",
          "By the way, I stopped my pickup at the Timmy's drive-thru this morning and picked you up a large double-double. Here you go. *reaches into beard and procures a large Tim Horton's coffee*",
          "Ah! The coffee of the proletariat. I am grateful, comrade. I'll have our media department arrange a photo of me sipping it at a family-run farm shortly. All the better to show our solidarity with the workers."
        ],
        1, 0, 1
      ],
      [ // 1
        [
          "My beard's really big."
        ],
        0,0,1
      ],
      [ //2
        [
          "Hey, Queen Notley. Check out this cute animal video!",
          "Oh my! The heart melts!"
        ],
        1,0,3
      ],
      [ //3
        [
          "Climate change is frightening. But the future is up to us!"
        ],
        1,0,3
      ]
    ],

    "Alberta Parks Officer": [
      [ //0
        [
          "Apologies, sir. The road through the park is closed at this time.",
          "If you speak with Calgary's mayor Nenshi, however, I'm certain he can arrange passage.",
          "But please come visit Alberta parks again soon!"
        ],
        0, 0, 0,
        () => {
          this.f.quiz_set_nenshi_quest();
        }
      ],
      [ //1
        [
          "Welcome! The road is open. Just pass through the gatehouse."
        ],
        1,0,1
      ],
      [ //2
        [
          "Apologies, sir.The road through the park is closed at this time."
        ],
        0,0,2
      ]

    ],

    "John Horgan": [
      [ //0
        ['Be still my dogs of war. The way ahead is flooded.',
         'From the swill before us drifts the fragrance of British Columbia\'s finest vintages, carelessly mixed together.',
         'Who would be so bold as to waste the bounty of our province and just... walk away?'
        ],
        0,0,1,
        () => {
            this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('John Horgan'),true);
        }
      ],
      [ //1
        [
        "That would be me, Mr. Horgan. Jason Kenney! Hero to Alberta.",
        "Jason. Jason... Kenney? Yes, I've heard of you. Yet another self-declared hero to the West whose provenance is the East. Pathetic."
        ],
        1,1,4,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 2
        [
          "I'm here to end your death-by-delay strategy of obstruction. Instead, I will obstruct YOU."
        ],
        0,1,3,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 3
        [
          "Are you sure Albertans aren't mistaking divine destiny for cattle emissions? Because what you're saying smells like cow shit to me.",
          "I'm here to end your death-by-delay strategy of obstruction. Instead, I will obstruct YOU."
        ],
        1,0,4,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 4
        [
          "I'm here to end your death-by-delay strategy of obstruction. Instead, I will obstruct YOU.",
          "Ba ha ha! What can you do? You're just an upstart former federal cabinet minister convinced of his own exceptionalism.",
          "The real power to stop me lies in the hands of your Queen Notley and the Emperor Trudeau.",
          [["Yes, but they're listening to ME.",5],["The UCP is a threat to you.",10]]
        ],
        1,1,4
      ],
      [ // 5
        [
          "Listening to a conservative?",
          "Conservative AND master strategist!"
        ],
        1,0,6,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 6
        [ 
          "Not only have I urged Emperor Trudeau to use his constitutional power to pass bill S-245 and ensure the pipeline is in the national interest ...",
          "... but I've also convinced him to use the power of the purse to FORCE your province's submission.",
          "Emperor Trudeau, if he acts wisely, will not hesitate to withhold funds marked for British Columbia.",
          "Without infrastructure investments and job training funding, your people will cry out. And Alberta will reap an even greater victory."
        ],
        0,1,7,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 7
        ["Mere threats."],
        0,0,8,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 8
        [
          "Maybe. But can you afford to renege on your party's promise that adult educational upgrades and English language programs would be tuition-free?",
          "Or the BC Bus North service, providing travel options to your province's northern climes?",
          "Face it: there is no NDP government without freewheeling spending, Mr. Horgan. It's your party's Achilles heel.",
          "And that money must come from somewhere."
        ],
        0,1,9,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 9
        [
          "So the presumed hero of Alberta is speaking up in favour of government overreach against a province defending itself? Ha ha ha ha!",
          "Sir Kenney, your words ... humour me. I will withdraw my dogs of war to British Columbia's lands.",
          "But know this: I would have thought that a province like Alberta, once harmed by the National Energy Program, would be keenly opposed to federal overreach.",
          "And that you would sympathize with a province defending its interests.",
          "I see now you will align yourself with whoever helps advance you.",
          "Sir Kenney, principles are still a valuable currency in the realm of politics. You may have paid for your victory today in fool's gold."
        ],
        0,0,9,
        () => {
          // quest completed
          this.game.score("horganPipeline",-2)
          this.f.pipeline_end();
        }
      ],
      [ // 10
        [
          "When my party comes to power, we will show you no mercy.",
          "We will flood your province with sanctions. Throttle ALL energy exports to you.",
          "No more diplomacy.",
          "Perhaps we'll even invade a 2-meter wide stretch of your province all the way to the coast and build our pipeline on it.",
          "Alberta is mighty. The UCP will wield that might ably and B.C. will submit."
        ],
        0,1,11,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 11
        [
          "Not if the constitution has anything to say about it. Your assuming powers you don't have.",
          [["I will trample the constitution!",12],["Your strategy of delay hurts all of Canada!",14]]
        ],
        0,0,11
      ],
      [ // 12
        [
          "Justice for Alberta is essential.",
          "For too long has this province been on the wrong end of anti-pipeline rhetoric from those who would benefit from it.",
          "Albertans share the bounty of their land and, once eagerly consumed by its critics, they call it toxic and brand Albertans climate criminals.",
          "Enough, I say! No agreement between the federal government and Alberta is good enough if it saps the province of its dignity.",
          "Alberta will go to arms for access to the ocean and I will lead them into the fray!"
        ],
        0,1,13,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 13
        [
          "Hmm... your words have moved me to withdraw my dogs of war, Sir Kenney. We will return to our lands.",
          "What's more: I give you the crystal that powers my war caravan.",
          "But know this: I would have thought that a province like Alberta, once harmed by the National Energy Program, would be keenly opposed to federal overreach.",
          "And that you would sympathize with a province defending its interests.",
          "I see now you will align yourself with whoever helps advance yours.",
          "Sir Kenney, principles are still a valuable currency in the realm of politics. You may have paid for your victory today in fool's gold."
        ],
        0,0,13,
        () => {
          // quest completed
          this.game.score("horganPipeline",1)
          this.f.pipeline_end();
        }
      ],
      [ // 14
        [
          "Investors are nervous. How will you pay for your generous social programs without the expansion of industry to support it?",
          "AND DON'T SAY TAXES!"
        ],
        0,1,15,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 15
        [
          "*Mumbling* Not a lot of taxes..."
        ],
        0,0,16,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 16
        [
          "Your stalling sets a poor precedent for major infrastructure investment across all of Canada.",
          "What future investors will do business when the mechanisms for resolving disputes with the federal government are in complete disarray?",
          "When there is clear potential for all projects to die the same way?"
        ],
        0,1,17,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('John Horgan'), true);
        }
      ],
      [ // 17
        [
          "Hmm… your words have moved me to withdraw my dogs of war, Sir Kenney. We will return to our lands.",
          "But know this: Alberta has assumed zero risk in the project. Your territory will not see the threat of double-hulled barges dangerously coursing through narrow passages en route to sea.",
          "Your business leaders in their suits, high up in their glass towers though they may be, cannot - will not! - see the risks I am defending British Columbia from.",
          "Take your victory today, Sir Kenney, and the crystal that powers my war caravan.",
          "It has served well my efforts to preserve British Columbians' dignity. Use it to preserve Albertans'."
        ],
        0,0,17,
        () => {
          // quest end
          this.game.score("horganPipeline",1)
          this.f.pipeline_end();
        }
      ],
      [ //18
        [
          "Queen Notley. Though let's be clear: not MY queen."
        ],  
        0,0,19,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Jagmeet Singh'),false);
        }
      ],
      [ //19
        [
          "Mr. Horgan. I understand you represent your province and there is *some* opposition to Alberta's pipeline reaching the coast.",
          "But you wish to shake my hand and make peace while your government enthusiastically builds LNG facilities as it puts my own government in peril?",
          "Ha! Away with you both. I'll shake hands before the TV cameras, whatever is required for optics. But you won't get any real concessions from me, comrades.",
          "For Queen Notley represents Albertans and will be held accountable to no other!"
        ],
        0,1,20
      ],
      [ //20
        [
          "Your decision is unfortunate, Queen Notley. This is a sordid web we weave when politicians on the same side of the aisle refuse to act in solidarity.",
          "No better words have been spoken...COMRADE."
        ],
        1,0,21,
        () => {
          this.game.score("horganHandshake",-3)
          this.f.ndp_palace_02_horganExits()
        }
      ],
      [ //21
        [
          "...COMRADE."
        ],
        0,0,21
      ],
      [ //22
        [
          "*shaking hands* Put it there...COMRADE."
        ],
        1,1,21,
        () => {
          this.game.score("horganHandshake",1);
          this.f.ndp_palace_02_horganExits();
        }
      ]
    ],

    "David Suzuki": [
      [//0
        ['Ha ha ha!'],
        0,0,0

      ]
    ],

    "Justin Trudeau": [
      [//0
        ["Justin! How ARE you?",
        "Sir Kenney. You fooled no one with your fake apologies for your finger-bowl comments about me.",
        [["Ha! No one who COUNTED was ever going to believe that apology!",1],["In fact, I AM sorry.",3]]
        ],
        1,1,0
      ],
      [ // 1 // entrypoint to pipeline quest when switched from Braid
        [ 
          "Is that so?",
          "I said something radical and got the media off my back about 'bozo eruptions' amongst my candidates.",
          "Hmm...",
          "I got front-page coverage and looked good being hard on you."
        ],
        1,0,2,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Justin Trudeau"),false) }
      ],
      [ // 2
        [
          "Justin, you're the most useful thing that's ever happend to me!",
          "Oh my, yes! So are you!",
          "You and I make the most mutually leverageable of enemies.",
          "*Chuckles* I'd shake your hand but I don't want your oiliness all over me.",
          "And I wouldn't want to inadvertently end up in your selfie."
        ],
        1,1,2,
        () => { var justin = this.game.actions.getCharacter("Justin Trudeau");
          if (this.game.actions.checkForQuestNodeId("Justin Trudeau","kq-q-pipeline-0")) {
            justin.data.dI = 9;
        } else {
            justin.data.dI = 30;
        } 
        this.game.dialogue.initDialogue(null,justin,false);
      }
      ],
      [ //3
        [
          "Is that so?",
          "Sorry we have such a milquetoast emperor! Ba ha ha!",
          "Always good for a 'bon mot,' Jason. I like that about you.",
          "Hmph. There's NOTHING I like about you."
        ],
        1,0,4,
        () => { var justin = this.game.actions.getCharacter("Justin Trudeau");
          if (this.game.actions.checkForQuestNodeId("Justin Trudeau","kq-q-pipeline-0")) {
            justin.data.dI = 9;
           } else {
            justin.data.dI = 30;
          }
          this.game.dialogue.initDialogue(null, justin, false);
        }
      ],
      [ //4
        [
          "Just as well. It would risk your worldview to give the progressive vision even a moment's consideration. It makes far too much sense.",
          "But that's what makes you so very useful to my federal Liberals, Jason.",
          "Your uncompromising attitude. It's too radical for most Canadians.",
          "They seek balance. Compromise.",
          "Now, with my newly forged sword, the Neo-Laurentia,' I shall reinforce these very values within the federation!",
          [["The Neo-Laurentia?",5],["I'm not here to listen to your twaddle.",9]]
        ],
        0,0,5
      ],
      [ // 5 => Neo-Laurentia speech v01
        [
          "Long have I been at work on the Aga Khan's island, forging in the flames of my own superlative image a new sword to rival conservatism.",
          "I call it, the Neo-Laurentia!",
          "My blade takes the name of the new order I shall bring to Canada, whose power will be centred on an empowered Ottawa that will shape this nation into its TRUE image:",
          "that of a 21st Century, liberal and secular society!",
          "Soon the Neo-Laurentian movement will dominate federalism!",
          "In public schools, religion will be out and French in!",
          "Progressive social policies will be legislated across the board.",
          "Tax dollars from the vassal provinces will fill Ontario and Quebec's coffers.",
          "Canada's heritage will be wiped from public institutions in favour of cultural symbols designed and approved by a committee of progressive academics.",
          "It will be a glorious new age!",
          [["This is madness!",6],["Mere praddle off of a cocktail napkin...",8]]
        ],
       0,0,5
      ],
      [ // 6
        [
          "It is a universal TRUTH that what the Invisible Hand giveth, the Invisible Hand taketh away!",
          "You're willfully blind to the power of the open market.",
          "Instead, you and your Liberal ilk pedal wrong-headed social policies and a statism that defies the will of the people.",
          "And that WILL, Justin, is to see their fortunes guided by the wise and principled Hand.",
          "NOT elitest bureaucrats!"  
        ],
        0,1,7,
        () => { 
          var trudeau = this.game.actions.getCharacter("Justin Trudeau");
          trudeau.data.dialogue = {swordConvo:true};
          //trudeau.data.dialogue.swordConvo = true;
          this.game.actions.addToCachedObject("Justin Trudeau",{dialogue:{swordConvo:true}},"kq02-calgary-03");
          this.game.dialogue.initDialogue(null,trudeau,false); 
        }
      ],
      [ //7
        [
          "My sword is powerful, Jason. More powerful than the Sword of Conservatism your Master Harper forged in the time of the federal conservative unification.",
          "It is this sword with which you carry out your own self-styled 'destiny.'",
          "But MY destiny, Jason, is guided by forces more powerful than your backward-looking deities"
        ],
        0,0,8,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false);
        }
      ],
      [ //8
        [
          "I haven't time for your nonsense. I have urgent business to discuss."
        ],
        0,0,9,
        () => { 
          var trudeau = this.game.actions.getCharacter("Justin Trudeau");
          trudeau.data.dialogue = {swordConvo:true};
          // trudeau.data.dialogue.swordConvo = true;
          this.game.actions.addToCachedObject("Justin Trudeau",{dialogue:{swordConvo:true}},"kq02-calgary-03");
          this.game.dialogue.initDialogue(null,trudeau,false) }
      ],
      [ //9 => entry point for queries about pipeline quest once switched out from Braid
        [
          "So what would you ask of your emperor?",
          [["So you're a pipeline owner now?",10],["What news of the warlord Horgan?",32]]
        ],
        0,0,9
      ],
      [ //10
        [
          "My government did what was required to ensure Canada's prosperity. It wasn't easy, but it was the right decision.",
          "That said, prosperity continues apace in this country, with the federal Liberals ... ",
          "... in partnership with the Alberta NDP ...",
          "... sounding the clarions."
        ],
        0,0,11,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false); 
        }
      ],
      [ //11
        [
          "Conservatives like myself may have had little choice but to support your purchase, Justin.",
          "But it was your policies and radical progressive values that forced you into this position.",
          "Your own policies are a poisoned chalice.",
          "With them, you harm Canadians. This will not stand!"
        ],
        0,1,12,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false);  }
      ],
      [ //12
        [
          [
            "You sound like you're making a run for emperor. I'm trembling.",
            "Nay! I'm simply defending Albertans, who want a role in Confederation based on respect and reciprocity."
          ]
        ],
        1,0,13,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false); }
      ],
      [ // 13
        [
          "A strong Canada means a strong Alberta, and vice versa. Your vision for the country harms both.",
          "Listen to me:"
        ],
        0,1,14,
        () => { 
          var trudeau = this.game.actions.getCharacter('Justin Trudeau');
          var newDI=0;
          if (trudeau.data.hasOwnProperty('dialogue')) {
            newDI = trudeau.data.dialogue.swordConvo?27:15;
          } else {
            newDI = 15;
          }
          trudeau.data.dI = newDI;
          this.game.dialogue.initDialogue(null, trudeau, false);
         } //got 3-option junction
      ],
      [ // 14
        [
          ""
        ],
        0,0,0
      ],
      [ // 15
        [
          "Allow me to argue my case.",
          [["I am a master strategist!",16],["I will argue with facts and numbers!",25],["I will threaten action with the sword",29]] // 3rd option if Neo-Laurentia speech not yet given
        ],
        0,1,15
      ],
      [ // 16
        [
          "I can suggest courses of action inconceivable to the second-rate minds staffing your government.",
          "Let us put aside our partisan bickering and work together - you, Queen Notley, and myself - to ensure the Trans Mountain pipeline's success."
        ],
        0,1,17,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false); }
      ],
      [ // 17
        [
          "Hmm...what do you have in mind?",
          [["Pass bill S-245",18],["Use the power of the purse",24]]
        ],
        1,0,17
      ],
      [ // 18
        [
          "Make the Trans Mountain pipeline officially in the national interest and override the B.C. government's delay tactics.",
          "And withdraw bill C-69 at once! Your federal Liberals have made it impossible to get another pipeline approved in the future --"
        ],
        0,1,19,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false); }
      ],
      [ // 19
        [
          "Hold it. That's only according to my GOOD friends, the oil executives in this room..."
        ],
        1,0,20,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false); }
      ],
      [ // 20
        [
          "Well, of course. Whatever!",
          "And repeal bill C-48 and allow oil tankers off the northern B.C. coast",
          "It hasn't gone unnoticed there's no equivalent ban in the east from bringing in oil from Venezuela and Nigeria."
        ],
        0,1,21,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false); }
      ],
      [ // 21 => negotiated end
        [
          "Finally, a UCP government will see to it all oil exports from Alberta to British Columbia are ended.",
          "They'll come crawling back to the negotiating table and you, Justi--",
          "...Emperor Trudeau...",
          "... will share in the victory."
        ],
        0,1,22,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false); }
      ],
      [ // 22
        ["Hmm...time is of the essence.",
        "After cancelling Energy East I can ill afford to see Trans Mountain fail, especially having gone to such lengths to ensure its success.",
        "Do as you must, Jason. I will continue to work with Queen Notley's NDP government to put and end to the warlord Horgan's delaying.",
        "But our interests here intersect, and there is much we both stand to gain from his defeat.",
        "To the west, the warlord Horgan was last seen passing through the mountains.",
        "There is a route following the unfinished pipeline his caravan will most surely take.",
        "Do with that information what you will."
      ],
      0,0,23,
      () => { 
        this.game.score("trudeaPipeline",1);
        this.game.player.addQuest('kq-q-pipeline')
      }
    ],
    [ // 23
      [
        "Do with the information I've given you what you will. But I will continue to work with Queen Notley's government."
      ],
      0,0,23
    ],
    [ // 24 => "Use the power of the purse"
      [
        "Withhold federal funds marked for British Columbia.",
        "Cut off the money from the tax and spend B.C. NDP and their social programs will crumble, bringing the government to its knees."
      ],
      0,1,21, // takes thread back to 'negotiated end'
      () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Justin Trudeau"),false) }
    ],
    [ // 25 => 'i will argue with facts and numbers'
      [
        "Year after year, Canada loses $15 billion off the sale of its oil because the U.S. remains our only export partner, resulting in a lower price.",
        "At that rate, we as Canadians cannot be divided within our federal system!",
        "I realise we are sworn enemies, but for the moment we face a challenge greater than the both of us."
      ],
      0,1,26,
      () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false); }
    ],
    [ // 26
      ["You're not wrong, Jason. Continue."],
      0,0,16,
    () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Justin Trudeau"),false) }
    ],
    [ // 27 => node junction without sword option
        [
          "Listen to me:",
          [["I am a master strategist!",16],["I will argue with facts and numbers!",25],["We're done here.",28]]
        ],
        0,1,27
    ],
    [ // 28
      [
        "Jason, have you not yet said your piece?"
      ],
      0,0,27,
      () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Justin Trudeau"), false); }
    ],
    [ // 29
      [
        "Jason, if a battle of might is what you seek you're in for a rude awakening."
      ],
      0,1,5,
      () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Justin Trudeau"),false) }
    ],
    [ //30
      [
        "Ho ho. Your wit is, as ever, biting.",
        "Unfortunately, I have little to say to you at this time.",
        "Return when there is something worthwhile to discuss."
      ],
      0,0,31
    ],
    [ // 31
      [
        "Return when you have something worthwhile to discuss."
      ],
      0,0,31
    ],
    [ // 32
      ["You're not in the federal government anymore. I needn't tell you anything.",
      "Justi-- I mean, Emperor Trudeau -- listen to me:",
      ],
      1,0,32,
      () => { 
        var trudeau = this.game.actions.getCharacter('Justin Trudeau');
        var newDI = 0;
        if (trudeau.data.hasOwnProperty('dialogue')) {
          newDI = trudeau.data.dialogue.swordConvo ? 27 : 15;
        } else {
          newDI = 15;
        }
        trudeau.data.dI = newDI;
        this.game.dialogue.initDialogue(null, trudeau, false);
       }
    ],
    [ //33 => trudeau-notley cutscene entry point
      [
        "Heya, Edmonton. It's me! Justin!"
      ],
      0,0,34,
      () => {
        this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Rachel Notley'),false,null,true);
      }
    ],
    [ //34
      [
        "But, I --"
      ],
      0,0,34,
      () => {
        this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Rachel Notley'),false, null, true);
      }
    ]
  ],

    "Pirate": [
      [//0
        ['Yarrgh! We be the crewsmen for the Dread Pirate Fildebrandt. Who be ye?'],
        0,0,0

      ]
    ],

    "Hooded Figure": [
      [//0
        ['The parts you will require to complete the challenge ahead lies elsewhere in these parts.',
        'Find it or use other means. The choice is yours, Jason.'],
        0,0,0
      ],
      [ //1
        ['The way forward, Jason, requires the correct sequence of sigils to be set.',
        'The solution can be found in Calgary. Would you like to travel there now?',
        [["Yes.",5],["No.",6]]
        ],
        0, 0, 1
      ],
      [ //2 => entry to boat across water
        [
          "Welcome, Jason Kenney.",
          "Your destiny awaits on the other side of the river."
        ],
        0,0,3,
        () => {
          this.f.boat_to_middle();
        }
      ], //3 => dialogue leading to figure revealing self
      [
        [
          "You know, you sound awfully familiar...",
          "I am indeed familiar, Jason Kenney. I've been sent by the High Council of Tory Elders to guide you on your quest."
        ],
        1,1,4,
        () => {
          var boat = this.game.objGroup.children[0];
          this.game.dialogue.initDialogue(null,boat.children[1],false);
        }
      ],
      [ //4
        [
          "I am..."
        ],
        0,0,4,
        () => {
          // reveal self animation
          this.f.boat_reveal_self();
        }
      ],
      [ //5
        [
          "Return here when you are certain of the required sequence."
        ],  
        0,0,1,
        () => {
          this.game.mapWorld.updateWaypoint("kq-q-carbontree-3");
          this.f.greatTree_travelToCalgary();
        }
      ],
      [ //6
        [
          "Do not tarry!"
        ],
        0,0,1,
        () => {
          this.game.mapWorld.updateWaypoint("kq-q-carbontree-3");
        }
      ],
      [ //7
        [
          "The way forward, Jason, requires the correct sequence of sigils to be set."
        ],
        0,0,7
      ]
    ],

    "Rona Ambrose" : [
      [ //0
        [
          "Rona Ambrose! Warrior Priestess, First Order of Artemis. I kneel before thee!",
          "You needn't bend the knee for long, Sir Kenney. For soon victory will be yours and as leader of this realm we shall be on equal footing.",
          "But what doth summon thee?",
          "I've come to aid you in your quest, Sir Kenney. Long did we fight as compatriots at the federal level, heeding the clarion-cry of balanced budgets and resource development."
        ],
        1,1,1,
        () => { 
          this.game.dialogue.initDialogue(null,this.game.actions.getBoatCharacter("Rona Ambrose"),false);
        }
      ],
      [ //1
        [
          "Since my return from the frontline of NAFTA renegotiations with the United Celestial Empire to the south, I have committed myself to recruiting more women into Albertan politics under the conservative banner.",
          "I feel strongly that your party is currently bereft of female participation. Albertans don't need old white guys telling them what to do."
        ],
        0,0,2,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getBoatCharacter("Rona Ambrose"),false);
        }
      ],
      [ //2
        [
          "Well said!",
          "*Sigh* Honestly, the male to female ratio in the UCP is cataclysmically embarrassing.",
          "Huh huh. Yeah… okay. I get it…",
          "But do not lose heart! Myself and all conservatism is on your side. Despite our namesake as Conservatives, we will adapt as necessary. So tally forth, Sir Kenney. Glory to the Hand!"
        ],
        1,1,2,
        () => {
          this.f.boat_to_shore();
        }
      ]
    ],

    "Bill Aberhart" : [
      [ //0
        [
          "'Bible' Bill Aberhart? Leader of Alberta's Social Credit Party?",
          "Indeed, it is I. The time of Rutherford's prophecy has drawn Alberta's heroes and historical footnotes alike to play their part. I humbly carry out mine.",
          [["Your legacy is significant!",1],["Fitting.",5]]
        ],
        0,0,1,
        () => { 
          //this.f.boat_to_shore();
          this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Bill Aberhart"), false);
        }
      ],
      [ //1
        [
          "I'd have thought so, too, but it would appear my ideas of social credit have been consigned to the dustbin of Canada's history. Along with my party.",
          "Just how in God's good name did it become the Pro-Life Alberta Political Association? Not that it doesn't represent my views, it just makes the mind wonder..."
        ],
        0,0,2,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Bill Aberhart"), false)
      ],
      [ //2
        [
          "In politics, there is much we who lead, though try as we might, can neither foresee nor control.",
          "The NDP's goal of destroying the Invisible Hand, for instance..."
        ],
        0,1,3,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Bill Aberhart"), false)
      ],
      [ //3
        [
          "Ah, yes. I, too, once endeavoured to slay the Invisible Hand, long before that whipper-snapper Lougheed and his ilk embraced it like a cult.",
          "The banks would have been the knee to my government! And no more would the plotters, money barons and the sons of Satan have enslaved Alberta's poor.",
          "Thankfully, my one lasting contribution to the province -- the Alberta Treasury Branches -- remains to this day. The only government-run bank in all of North America!"
        ],
        0,0,4,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Bill Aberhart"), false)
      ],
      [ //4
        [
          "Uh, yeah. About that. I'm totally going to privatize it.",
          "What?! You lout! Scoundrel! The sole remaining piece of my legacy and you'd callously throw it away?",
          "Sir Aberhart, if the great Ralph Klein tried to do it, then it's the right decision by my account. We've nearly reached the shore.",
          "Hmph. Be off with you, but your judgment will surely come."
        ],
        1,1,5,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Bill Aberhart"), false)
      ],
      [ //5
        [
          "Social credit was an idea for which there was never a time, Sir Aberhart. It was a dark magic, like carbon enchantments and ideologically-driven education reform.",
          "Though, I do agree with you that the moral grounding of the education in your day is far preferable to what we have now."
        ],
        0,1,6,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Bill Aberhart"), false)
      ],
      [ //6
        [
          "That is just as well, Sir Kenney. But you're still guilty of playing lackey to the money barons and the sons of Satan who've enslaved Alberta's poor.",
          "And I, I who fought the vile influence of capital on Alberta's farmers and labourers, am consigned to shuttling you safely to Edmonton.",
          "Sugar! I led the greatest grassroots movement in the history of Canada!"
        ],
        0,0,7,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Bill Aberhart"), false)
      ],
      [ //7
        [
          "And I will lead the greatest since, except I'll enjoy far more success.",
          "Hmph. Only time will tell, Sir KENNEY..."
        ],
        1,1,7,
        () => this.f.boat_to_shore()
      ]

    ],

    "Freddie Mercury" : [
      [ //0
        [
          "Freddie Mercury!",
          "Here I am! I am the master of your destiny. And you: a simple man with a simple name.",
          "I ask that you open your mind and let me step inside...",
          [["Uh, okay...",1],["No!",5]]
        ],
        0,0,0,
        () => { 
          //this.f.boat_to_shore();
          //this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Freddie Mercury"),false);
        }
      ],
      [ //1
        [
          "I see an orange queen, poking in the pile. Fie-fo she comes, marching single file.",
          "She's a killer queen! Dynamite with a laster beam."
        ],
        0,0,2,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Freddie Mercury"), false)
      ],
      [ //2
        [
          "Yes, Queen Notley IS a job killer, but cunning. I guarantee you, she, at times, blows even my mind. But the premiership is mine, so the Tory gods hath proclaimed it.",
          "But to attain my prize, I require answers to my questions. Are you here to aid me in my quest, Mr. Mercury?"
        ],
        0,1,3,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Freddie Mercury"), false)
      ],
      [ //3
        [
          "Everything you need to know, you'll hear it on the radio.",
          "Of course! Right-wing talk radio. The font of all conservative wisdom!"
        ],
        1,0,4,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Freddie Mercury"), false)
      ],
      [ //4
        [
          "Very good, Mr. Mercury. We approach the shore where beyond lay Edmonton.",
          "With your words, I am emboldened. I am a man that will go far.",
          "With my head held high, I will pass this test the first time."
        ],
        0,1,4,
        () => this.f.boat_to_shore()
      ],
      [ //5
        [
          "Just play the game. There's no escape from my authority!",
          "You just want to be given the prize, but there's no chance for you, or any of us. It's all decided for us."
        ],
        0,0,6,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getBoatCharacter("Freddie Mercury"), false)
      ],
      [ //6
        [
  
          "I agree the the burden Lady Destiny hands me is great, and it's both my pain and pleasure alone to bear it. Like Ralph Klein before me, leadership of this province is mine to hold forever. So the Tory gods hath proclaimed it.",
          "Pain is so close to pleasure. Who wants to lead forever?",
          "I wish it were not so, but as you said, that decision rests in the lap of the gods.",
          "And where will your principles go once you've taken the prize?",
          "Ha ha! Any where the wind blows, my good man. Any where the wind blows."
        ],
        1,1,6,
        () => this.f.boat_to_shore()
      ]
    ],

    "Dying UCP Soldier": [
      [//0
        [
          "*Choke* Sir Kenney! The battle is developing in our favour as the NDP slips back to Edmonton, but they are far from routed.",
          "I, however, am *ungh* lost."
        ],
        0,0,1,
        () => {
          // var soldier = this.game.actions.getCharacter("Dying UCP Soldier");
          // soldier.animations.stop();
          // soldier.frameName = 'npc-12-death/_02.png';


          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Dying UCP Soldier"),false)
        }
      ],
      [//1
        [
          "You have fought valiantly, fair warrior. Go gently into the fields of Elysium, where the lands are as bountiful as the Alberta prairie.",
          "There you will find a herd to every cattleman, a big-C principled government is always in power, and you can trust that the minimal contributions you make as a taxpayer are spent wisely."
        ],
        0,1,2,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Dying UCP Soldier"), false)
      ],
      [ //2
        [
          "And *uuungh!* not on some cockamamie social engineering scheme by progressive bureaucrats!",
          "Indeed.",
          "Where...w-where the government can't *cough* FORCE me to wear a helmet on my ATV if I darn well don't please.",
          "...Sure.",
          "Where...where Alberta is an independent n-nation!",
          [ ["Now, let's not get ahead of ourselves...",3],
            ["*Rolls eyes* Yeah, alright.",4],
            ["What is WITH you separatists?",5]
          ]
        ],
        1,0,2
      ],
      [ //3
        [
          "W-where parents have the right to know whether their children are members of gay-straight clubs!",
          "Oh, for f@#k's sake... I gotta go...",
          "*Choke*"
        ],  
        1,0,6,
        () => {
          this.game.score("dyingSoldier",-1);
          this.f.setDyingUCPSoldier()
        }
      ],
      [ //4
        [
          "Where I can be ... PROUD ... to be a member of the Lake of Fire party!",
          "*Choke*"
        ],
        1,0,6,
        () => {
          this.game.score("dyingSoldier",-1);
          this.f.setDyingUCPSoldier()
        }
      ],
      [ //5
        [
          "Alberta will never be truly free until we've cast off the yoke of confeder--",
          "*Croak*"
        ],
        0,0,6,
        () => {
          this.game.score("dyingSoldier",1);
          this.f.setDyingUCPSoldier()
        }
      ],
      [ //6
        ["..."],
        0,0,6,
        () => this.f.setDyingUCPSoldier()
      ]
    ],

    "Truckstop Barista": [
      [ //0
        [ 
          "Hey, man. What can I get ya?",
          "Coffees for freedom loving Albertans, please and thank you.",
          "Ok! We have artisanal coffee available as an espresso, Americano, cappuccino, flat white, iced, or pour-over. Your call, dude."
        ],
        1,0,5,
        //() => { this.f.fildebrandt_buttonMashChallenge(); }
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Truckstop Barista"),false)
      ],
      [ //1
        [
          "Ha! I win. Kept my cool. Nobody puts Derek Fildebrandt in the corner!",
          "Whatever, man. It wasn't a contest."
        ],
        1, 1, 2,
        () => {
          this.f.fildebrandt_endCoffeeChallenge(1);
        }
      ],
      [ //2
        [
          "Whatever, man. It wasn't a contest."
        ],
        0, 0, 2
      ],
      [ //3
        [
          "What on earth happened to good, old fashioned, regular, hard-working taxpayer coffee?",
         "I ... don't know what that is. I imagine most people here pay their taxes...",
         "I'm talking about coffee made in an everyday perculator and served in a styrofoam cup."
        ],
        1,0,4,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Truckstop Barista"),false)
      ],
      [ //4
        [
          "Styrofoam that, by the way, I as a FREE Albertan has EVERY RIGHT to toss carelessly from my truck when I'm done.",
          "Or maybe I'm NOT done! Maybe I don't WANT any more. Maybe it's lousy instant coffee that I wanted at the time and I decided I no longer do.",
          "That's my freakin' RIGHT."
        ],
        1,1,5,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Truckstop Barista"),false)
      ],
      [ //5
        [
          "What on earth happened to good, old fashioned, hard-working taxpayer coffee served in a styrofoam cup that it's my RIGHT to chuck from my car window?",
          "Uh-huh. Sure, man. Tell you what, we've got a Valium mocha chai latte if you're interested.",
          "Mocha...chai...WHAT?! OH. MY. GAWD!"
        ],
        1,0,6,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Truckstop Barista"),false)
      ],
      [ //6
        [
          "*Deep breathing* Keep it together, Derek. Can't let the liberals get the better of you...",
          "It's served in a cup made of pulped feedlot grass with your choice of ethically-produced caramel, chocolate or whipped cream and gluten-free sprinkles."
        ],
        1,1,7,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Truckstop Barista"),false)
      ],
      [ //7
        [ 
          "Raaaaagh!"
        ],
        1,1,7,
        () => this.f.fildebrandt_buttonMashChallenge()
      ],
      [ //8
        [
          "Gynnggghh!!!",
          "That's it! I'm outta here!"
        ],
        0, 1, 9
      ],
      [ //9
        [
          "Now's probably not a good time to tell you we get business incentives from the government for our inclusive, globalised and ethical approach to coffee..."
        ],
        0,0,9,
        () => {
          this.f.fildebrandt_endCoffeeChallenge(0);
        }
      ]
    ],

    "Wendell": [
      [ //0
        [
          "Did you know Red Deer's official cookie is the Caramel Suprise?",
          "True story!"
        ],
        0, 0, 0
      ]
    ],

    "Candice": [
      [ //0
        [
          "Coffee tastes so much better when I know its environmental impact has been factored into its cost to me as the consumer."
        ],
        0, 0, 0
      ]
    ],

    "Jay": [
      [ //0
        [
          "Would you consider putting aside those bacon and eggs for some fried seitan and tofu scramble?"
        ],
        0, 0, 0
      ]
    ],

    "Oil Executive 1": [
      [ //0
        ["Money, money, money! Drill, drill, drill!"],
        0,0,1
      ],
      [ //1
        [
          "Unless you've got a politician, academic, scientist or journalist you want me to buy, I don't have time for you."
        ],
        0,0,0
      ]
    ],

    "Oil Executive 2": [
      [ // 0
        [
          "I stress-eat caviar and white truffles when locked in regulatory battles with governments.",
          "It's not fair."
        ],
        0,0,0
      ],
      [ // 1 => entry point for valve acquisition
        [
          "Oh, hello there. You have the look of someone who wants to do business. Lay it on me.",
          "I come seeking a valve wheel to open the unfinished pipeline in the mountains.",
          "Uh-huh. A politician asking for a favour. What's in it for me?",
          "The end of delays to the pipeline's construction. The retreat of the B.C. NDP back to their territories.",
          "Okay...",
          "Um...the unbridled flow of money back into your sizeable pockets?"
        ],
        1,0,2,
        () => {
          this.game.dialogue.initDialogue(false, this.game.actions.getCharacter("Oil Executive 2"), false)
        }
      ],
      [ // 2
        [
          "Mmmmm...money!",
          "Money, money, money!",
          "*sniffs self* Ooh, I'm covered in its aphrodesiac-like scent.",
          "But I need more! MORE!",
          "Here you go. A valve wheel. It will open the unfinished pipeline and flood the road with all of the B.C. wine we were planning on sending back.",
          "Do whatever you need to do to get the money flowing again so I might BATHE in ever-greater wealth."
        ],
        0,0,3,
        () => {
          this.f.acquire_valveWheel("Oil Executive 3");
        }
      ],
      [ // 3
        [
          "Do whatever you need to do to get the money flowing again so I might BATHE in ever-greater wealth."
        ],
        0,0,3
      ]
    ],

    "Oil Executive 3": [
      [ // 0
        [
          "I've got a fifth Rolex riding on this pipeline's success."
        ],
        0,0,0
      ],
      [ // 1 => entry point for valve wheel acquisition
        ["I can smell an exploitable opportunity from a mile away, and you look like chum in the water to me. What are you after?",
        "I seek a valve wheel to open the unfinished pipeline in the mountains.",
        "Oh, yes. The Trans Mountain. Do you have a plan to fend off the irksome warlord Horgan and his marauding band of B.C. NDP members?",
        "Yes!",
        "I can help. But it will cost you ... your soul.",
        "What?",
        "Just kidding! Ha ha! Whooie! You should've seen your face."
      ],
      1,0,2,
      () => {
        this.game.dialogue.initDialogue(false,this.game.actions.getCharacter("Oil Executive 3"),false)
      }
    ],
    [ // 2
      [
        "Hoo hoo! Hee hee! You're an Albertan politican ... I already have it."
      ],
      0,0,3,
      () => {
        this.game.dialogue.initDialogue(false, this.game.actions.getCharacter("Oil Executive 3"), false)
      }
    ],
    [ // 3
      [
        "I am a servent of the Invisible Hand, the one true market force!",
        "His wisdom suffuses our province's energy industry and ensures the land's bounty remains Albertans' to reap!"
      ],
      0,1,4,
      () => {
        this.game.dialogue.initDialogue(false, this.game.actions.getCharacter("Oil Executive 3"), false)
      }
    ],
    [ // 4
      [
        "Of course. Of course. The Hand.",
        "Here's the valve wheel. It will open the unfinished pipeline and flood the road with all of the B.C. wine we were planning on sending back.",
        "I want to see dollars coming out my ears when this is all over."
      ],
      0,0,5,
      () => {
       this.f.acquire_valveWheel("Oil Executive 2");
      }
    ],
    [ // 5
      [
        "I want to see dollars coming out my ears when this is all over."
      ],
      0,0,5
    ]
    ],

    "Oil Executive 4": [
      [ // 0
        [
          "That Trudeau who's joined our ranks...I still don't trust him. It took a lot for us to get onboard with Queen Notley when she came to power."
        ],
        0, 0, 0
      ],
      [ //1
        [
          "My six-month vacation starts tomorrow but I've only made upward of $300,000 the past two quarters!"
        ]
      ]
    ],

    "Oil Executive 5": [
      [ // 0
        [
          "NO one will deny me my God-given right to pull as much oil from the ground as I want without paying royalties."
        ],
        0, 0, 0
      ]
    ],

    "Hippolyte the Scurvy-Ridden Taxpayer": [
      [ //0
        [
          "Yarrgh! I may be plagued with scurvy, but that doesn't mean I expect a handout from the government to maintain me health.",
          "'Personal responsibility before all else', as Cap'n Fildebrandt would say!"
        ],
        0,0,0
      ],
      [ //1
        [
          "Yargh! As a vanilla conservative, you're not welcome aboard.",
          "But I abide ye so long as the cap'n says to."
        ],
        0,0,1
      ]
    ],
    "Lloyd": [
      [ //0
        [
          "Yaargh!"
        ],
        0,0,0
      ]
    ],

    "Doug": [
      [ //0
        [
          "Yarrgh! We be the crewsmen for the Dread Air Pirate Fildebrandt, leader of the most vicious political party to ever sail Alberta's skies. Who might ye be?",
          "I am Jason Kenney! Leader of the United Conservative Party and hero to Alberta!",
          "Aye. I've heard of ye. Our cap'n has little good to say about ye. But in my opinion, he wants nothin' more than to be in yer good graces.",
          "Is that so? The scamp shouldn't have lied to me about illegally hunting deer.",
          "Well, if the cap'n were around I'd leave it to you to discuss it with the him."
        ],
        1, 0, 1
      ],
      [ //1
        [
          "I'll leave it to you to discuss yer differences with the cap'n."
        ],
        0,0,1
      ]
    ],

    "Derek Fildebrandt": [
        [ //0
          [
            "Jason Kenney. You kicked me out of the UCP but look at me now! I have my own party AND my own airborne pirate ship. Things are comin' up Fildebrandt.",
            "Nice to see you again, Derek.",
            "That's Dread Pirate Fildebrandt to YOU, Jason. I'm the most fearsome pirate captain to ever sail Alberta's skies. And an incomparable force in provincial politics bar NONE.",
            "Derek, it's not even worth my time arguing with you.",
            "No, it's not.",
            "So I won't. Goodbye.",
            "Wait. Uh, wait!",
            [
              ["Yes?",2],
              ["I'm off.",5]
            ]
          ],
          1, 0, 0,
          () => { 
            //this.f.fildebrandt_edmonton_path();
          }
        ],
        [ //1 => entry point for Starke path selection. Ensures player can't take Derek's path
          [
            "Jason Kenney. You kicked me out of the UCP but look at me now! I have my own party AND my own airborne pirate ship. Things are comin' up Fildebrandt.",
            "Nice to see you again, Derek.",
            "That's Dread Pirate Fildebrandt to YOU, Jason. I'm the most fearsome pirate captain to ever sail Alberta's skies. And an incomparable force in provincial politics bar NONE.",
            "Derek, it's not even worth my time arguing with you.",
            "No, it's not.",
            "So I won't. Goodbye.",
            "Wait. Uh, wait!",
          ],
          0,0,7
        ],
        [ // 2 => entrypoint for fildebrandt quest convo with kenney
          [
            "I, uh, know we've had our differences...",
            "You lied to me repeatedly, Derek. About everything. You're a walking liability.",
            "*mumbling* But I'm a pirate...",
            "Look, I may need your help. As a fellow conservative I'm sure you'll agree the situation is dire enough to merit your help in my quest.",
            "What situation might that be?",
            [
              ["The NDP have captured the Invisible Hand.", 3],
              ["I seek the lost Crystals of Confederation",4],
              ["Never mind.",5]
            ]
          ],
          1,0,0
        ],

        [ // 3
          [
            "The Invisible Hand of the Market? The one true market force!? What is UP with liberals and their radical ideological, socialist agendas?",
            "My sentiment exactly.",
            "I mean, honestly. Liberals!",
            "Truly, for all your faults, Derek, you feel the lusty battlecry of conservatism in your breast.",
            "Jason, I live to engage liberals in swashbuckling combat and make their heads explode.",
            "Then seize this opportunity to help a fellow a conservative.",
            "What would you ask of me?",
            "I need your ship to enter undetected into Edmonton.",
            "Ha! A stealth mission. I can do that. The Dread Pirate Fildebrandt can do anything. Hop aboard!",
            [
              ["Let's go.",16],
              ["Not just yet.",14]
            ]
          ],
          0, 0, 3
        ],

        [ // 4
          [
            "Huh. You too, then?",
            "It would appear the search for the lost Crystals is the biggest open secret throughout Alberta politics at the moment.",
            "Nothing gets by Derek Fildebrandt. I'm a force of nature in Alberta politics. In fact, one such crystal powers my ship.",
            "What crystal do you hold?",
            "The Crystal of Rugged Individualism. It's a natural fit for ol' Derek, man of the people.",
            "I believe kudos are in order. You would be wise to aid me then, Derek, as the stakes are high in the race for the crystals.",
            "How so?",
            "The NDP seek to destroy the Invisible Hand of the Market and impose untold levels of regulation upon Alberta for all time to come."
          ],
          0, 0, 3,
          () => {
            this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Derek Fildebrandt"),false);
          }
        ],

        [ // 5
          [
            "Wait! What?! Nobody just walks away from Derek Fildebrandt. Nobody!"
          ],
          0,0,6
        ],

        [ //6
          [
            "Hunh. You came crawling back. They always do. What is you want?",
            [
              ["The NDP have captured the Invisible Hand.", 3],
              ["I seek the lost Crystals of Confederation", 4],
              ["Never mind.", 5]
            ]
          ],
          0,0,6
        ],
        [ // 7
          [
            "Nobody just walks away from the Dread Pirate Fildebrandt. Nobody."
          ],
          0,0,7
        ],


        [ //8 => init function for airship. After convo, trigger tiles at ship front laid down
          [
            "Welcome aboard my ship, maties, the headquarters of the Alberta Freedom Conservative P-AARGH-ty.",
            "We'll lay anchor just outside Edmonton on a course that will take us directly over Red Deer.",
            "If you head to the bow we'll talk more."
          ],
          0,0,8,
          () => {
            this.f.airship_initFunction_tiles_laydown("fildebrandt_trigger_launch_quest",350);
          }
        ],

        [ // 9 => convo that launches fildebrandt quest
          [
            "Ha! You never thought you'd come seeking the help of ol' Derek, did you, Jason?",
            "Truthfully, no. But these are desperate times and the UCP must use every advantage available to it.",
            "Same for the Alberta Freedom Conservative Party. Remember, I've worked with you, studied your strategies. I was the first to support you in your bid to merge with the Wildrose.",
            "Yes, you have been a staunch warrior for Conservatism. The Tory gods have a plan for you.",
            "You bet they do. They need ME to stop not only the radical socialists who've taken over this province, but also YOU, Jason."
          ],
          1, 0, 10,
          () => {
           this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Derek Fildebrandt"),false);
          }
        ],
        [ //10
          [
            "Your party's too vanilla. In trying to please everyone you've created a watered-down movement that doesn't do ENOUGH for Conservatives in this province.",
            "Nonetheless, the UCP's armies are vastly stronger than yours.",
            "I'm sorry. Do YOU have a flying pirate ship? Do ya? Huh?",
            "No. But our means of winning power in this province our rooted in pragmatism, not ostentatious displays of conservativism." // if I didn't know any better, I'd almost accuse you of virtue-signalling
          ],
          1,0,11,
          () => {
            this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Derek Fildebrandt"), false);
          }
        ],
        [ //11
          [
            "Ostentatious?! This is about Freedom! Albertans being in control of their own laws instead of being told what to do by dictatorial emperors in Ottawa hungry to take all our oil for themselves.",
            "*Sigh* Derek, you're tiresome. Tell you what:",
            [
              ["Go fetch us coffee.",12],
              ["Leave us alone.",13]
            ]
          ],
          1,0,12
        ],
        [ //12  
          [
            "When we land in Red Deer. Then I'll consider a place for you on my caucus when the UCP takes power.",
            "Uh...oh my God. I'd do ANYTHING to be in your party again. It's a deal! We're approaching Red Deer now!"
          ],
          1,1,12, ()=>{
            this.game.score("fildebrandtCoffee",-1);
            this.f.fildebrandt_launch_quest(true); // provide param to set up a specific new comment thread?
          }
        ],
        [ //13
          [
            "Just...give us some peace and quiet so we can make our plans for Edmonton?",
            "What? N-nobody gets peace and quiet from Derek Fildebrandt! We're landing in Red Deer right now! I'm going on a coffee run for my crew cause I'm a NICE guy and I'm getting NONE for you!"
          ],
          1,0,13, 
          () => {
            this.game.score("fildebrandtCoffee",1);
            this.f.fildebrandt_launch_quest(false); // provide param to set up a specific new comment thread?
          }
        ],
        [ //14
          [
            "My crew is ready to depart anytime."
          ],
          0,0,15
        ],
        [  //15
          [
            "Ready to go?",
            [
              ["Let's go.",16],
              ["Not just yet.",14]
            ]
          ],
          0,0,15
        ],
        [ //16
          [
            "Then we're off!"
          ],
          0,0,16,
          () => {
            this.f.fildebrandt_edmonton_path();

          }
        ],
        [ //17 return to airship. After convo, lay down dragon trigger tiles at ship front => use this if coffee challenge successful
          [
            "Coffees! I have your coffees! Oh boy, oh boy, here you go!",
            "So, let's talk about ol' Derek's role in the United Conservative Party--"
          ],
          0,0,23,
          () => {
            this.f.fildebrandt_dragonCry();
            //this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Max'), false)
            //this.f.airship_initFunction_tiles_laydown("launch_dragon_bossFight",220);
          }
        ],
        [ //18 => use this if coffee challenge failed
          [
            "Jason, before you say anything, no, I don't have your coffees.",
            "And whatever you see on social media, it's not my fault. It's the liberals'."
          ],
          0,0,22,
          () => {
            this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Derek Fildebrandt"),false);
            //this.f.airship_initFunction_tiles_laydown("launch_dragon_bossFight",220);
          }
        ],
        [ //19 convo after dragon battle that leads to edmonton
          [
            "Jason, we have our differences, but you saved my ship and I thank you.",
            "Derek, you can thank me by getting us safely to Edmonton and landing outside the city."
          ],
          1, 0, 19,
          () => {
            this.f.edmonton_setup_from_airship();
          }
        ],
        [ //20
          [
            "Mmmm. This coffee's delicious. I have my own coffee JUST like I have my own PARTY.",
            "How do you like THEM apples, Jason?"
          ],
          1,0,22,
          () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Derek Fildebrandt'),false)
          //this.f.airship_initFunction_tiles_laydown("launch_dragon_bossFight", 220);
        ],
        [ //21
          [
            "Look, before you say anything, no, I don't have coffees for me and my crew because I CHANGED MY MIND.",
            "As a free Albertan, I can do that. Unlike the MLAs in YOUR party, JASON."
          ],
          1, 0, 21,
          () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Derek Fildebrandt'), false)
          //this.f.airship_initFunction_tiles_laydown("launch_dragon_bossFight", 220);
        ],
        [ //22
          [
            "Whatever, Derek. How far are we from Edmonton?"
          ],
          0,1,22,
          () => this.f.fildebrandt_dragonCry()
        ],
        [ //23 => init dragon attack
          [
            "Ooh, it'd better not be taxpayer-funded!",
            "Take everyone below! I will head to the bow and confront Notley's winged beast."
          ],
          1,0,24,
          () => {
            this.f.airship_initFunction_tiles_laydown("launch_dragon_bossFight", 220);
          }
        ],
        [ //24
          [
            "MY pirate ship is PRIVATELY OWNED, JUST as it should be."
          ],
          0,0,24
        ]
    ],

    "Don Braid": [
      [ //0
        ["Hi, I'm Don Braid, political scribe with the Herald. You must be Jason Kenney.",
        "It is I! THE Jason Kenney, scourge to toothless media elites such as yourself.",
        "A touch standoffish, I see. It's no matter. I've been a humble scribe a long time and have heard it all.",
        [ ["Tell me the news",1],["You and your cronies think you're so smart...",3] ]
      ],
        1, 0, 0
      ],
      [ //1 
        [
          "Well, things are grim, a situation our province's politics currently reflect.",
          "Two fractious parties going toe-to-toe, abandoning the spirit of compromise that characterized our politics only a decade ago.",
          "Albertans were a unified and cohesive people. It helped us win many battles against the Emperors to the east in Ottawa.",
          "I fear, Mr. Kenney, you, too, are a symptom of our current disunity."
        ],
        0,0,2,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter('Don Braid'), true)
        }
      ],
      [ //2
        [
          "Yeah, whatever. I'm looking for quests. What've you got?",
          "Certainly. To the west, British Columbia's Chief Warlord John Horgan has been tearing up pipeline projects while to the south, rats have returned to the province, led by the ignoble Vermin King.",
          [["Tell me about the Chief Warlord John Horgan",4],["Tell me about the rats",5],["I've heard enough. We're done here.",7]]
        ],
        1,1,3
      ],
      [ //3
        [
          "You opinion elites sitting in your echo chambers can't hear the voices of ordinary people over the din you create.",
          "Uh-huh...",
          "People want a fighter for them and their families, not be lectured by know-it-alls.",
          "Hmm...",
          "But the truth is we're winning and YOU in the MEDIA were against me and had it wrong from the start. So THERE."
        ],
        1,1,6,
        () => { 
          this.game.score("donBraidPosturing",1);
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Don Braid'),true)
        }
      ],
      [ //4 => horgan
        [
          "John Horgan, like our province's Queen, is of the NDP party. Many moons past, the two fought alongside one another in the name of the environment, but no more.",
          "In a bid to maintain power in Alberta in the face of the united conservative movement you lead, Jason, Queen Notley has had to aggressively pursue a pro-pipeline policy.",
          "The expansion of the Kinder Morgan pipeline from Alberta to British Columbia's coast was to be her signature accomplishment on the energy file...",
          "...but opposition to the project in our neighbouring province has led Warlord Horgan to act against it.",
          "Now he leads a band of marauders through the mountains laying waste to pipeline projects wherever he can find them. It's brought chaos and destruction to Alberta."
        ],
        0,0,9,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Don Braid'),true) }
      ],
      [ //5 => rats
        [
          "As you well know, Alberta has been rat-free since the 1950s when the province developed a program to monitor the rat population spreading from the east.",
          "Its success is inarguable proof of Alberta's ingenuity, but global forces being what they are, a new population has found its way into the province.",
          "Led by the Vermin King, his rat army have infested the lands to Calgary's east.",
          "The king himself takes refuge inside a cave, the keys to which are hidden on his rat minions.",
          "Purging Alberta of this menace would restore our province's pride in being rat-free."
        ],
        0,0,11,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Don Braid'),true) }
      ],
      [ //6
        [
          "So there indeed! Your posturing is to be commended, Sir Kenney!",
          "Thank you.",
          "Is there anything else I can help you with?",
          [["Yeah, uh...have you got any news for me?",2],["No. I have more voters to win over. I'm off.",7]]
        ],
        1,0,6
      ],
      [ //7
        [
          "Good day to you."
        ],
        0,0,8
      ],
      [ //8
        [
          "Mr. Kenney. You've returned to gloat more or do you seek information?",
          [["Yeah, uh...have you got any news for me?",1],["No. I have more voters to win over. I'm off.",7]]
        ],
        0,0,9
      ],
      [ //9
        [
          "Have we as a province not suffered enough? The time is right for strong leadership.",
          "Say what you will, Jason, Queen Notley, working with the federal government to purchase the pipeline was bold and went a long way to ensure the project would go ahead.",
          "Yes, but, endless delays since have shown just how incompetent Emperor Trudeau is. Queen Notley's mistake has been in partnering with him. Only a TRUE leader can deliver the pipeline and that leader is ME.",
          "Okay, Jason. I don't doubt it. Good luck to you."
        ],
        1, 1, 10,
        () => { this.game.npcFunctions.donBraid_pipeline_switchout(); this.game.player.addQuest('kq-q-pipeline');  } // horgan quest added
      ],
      [ //10
        [
          "Good luck to you, Jason."
        ],
        0,0,10
      ],
      [ //11
        [
          "This sounds like exactly the kind of problem the winds of destiny carried me here to solve.",
          "That's a unique take, Jason. Good luck to you."
        ],
        1, 1, 10,
        () => {
          this.game.npcFunctions.donBraid_ratKing_switchout();
          this.game.player.addQuest('kq-q-ratking');
          //this.game.mapWorld.updateWaypoint('kq-q-ratking'); // manually update waypoint for some reason...
        } // ratKing quest added
      ]
    ],


    "Dina the Intern": [
      [ //0
        [ "Don't mind me. I'm just the intern. Uh, I don't actually know anyone here."],
        0,0,1
      ],
      [ //1
        [ "W-what's a ... C-M-S?"],
        0,0,2
      ],
      [ //2
        [ "I'm going to a/b test the heck out of these headlines!"],
        0,0,3
      ],
      [ //3
        [ "Engagement is up! That last 'five things' article I wrote's def gonna get me promoted."],
        0,0,0
      ]
    ],

    "Brad Wall": [
      [ //0
        [
          "Jason, amigo! Hail to the Invisible Hand!",
          "The Hand! How are you, Brad?",
          "Oh, as well as any popular former Saskatchewan premier now working as an adviser to a posh law firm in Alberta's energy and agriculture sectors can be."
        ],
        1,0,1,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Brad Wall'),true) }
      ],
      [ //1
        [
          "Which is say to say, 'Pretty darn good, Jason. Pretty darn good.'",
          "The only bee in my bonnet is this blasted carbon enchantment Queen Notley and Emperor Trudeau are working to impose. It's not right."
        ],
        0,0,2,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Brad Wall'),true) }
      ],
      [ //2
        [
          "*Chuckles* It's misguided, to say the least. And most displeasing to the Hand!",
          "Most indeed! My clients are seething. Something must be done.",
          [["I see an opportunity for my firm leadership.",3],["What are the other province's leaders planning?",4]]
        ],
        1, 1, 2
      ],
      [ //3
        [
          "Trudeau and Notley are wielding dark magicks - also known as progressive trickery - to draw carbon from the air at the expense of taxpayers and business.",
          "Jason, are you familiar with the sorcery that is the Great Tree of Carbon Taxation?",
          [["No. Tell me more.",5],["*Pfft* Of course!",6]]
        ],
        0, 0, 2
      ],
      [ //4
        [
          "Doug Ford, Grand Duke of Ontario, and my successor in Saskatchewan, Scott Moe, have taken the lead in opposing the tax.",
          "Together with Manitoba's leader, conservative provincial leaders are banding together to seek the source of the magick, the Great Tree of Carbon Taxation. Have you heard of it?",
          [["No. Tell me more.",5],["*Pfft* Of course!",7]]
        ],
        0, 0, 2
      ],
      [ //5
        [
          "Ages ago (around 2007), Alberta became the first realm throughout the whole of this mighty continent to plant the seeds of the Carbon Tax Tree deep in the Enchanted Forest of Regulations.",
          "Its roots spread quickly, leading both the federal Liberal and Conservative parties to campaign on the carbon tax.",
          "But it was always folly. My government in Saskatchewan developed a plan at the behest of special interests, but fought tooth and nail against implementing it.",
          "Since then, conservative opinion has turned against cap and trade. Think of the oil and gas industry! The jobs!"
        ],
        0, 0, 6,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Brad Wall'),true) }
      ],
      [ //6
        [
          "Oh, I know. I know!",
          "The tree must come down. Principled Conservatives MUST axe that tax!"
        ],
        1, 1, 7,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Brad Wall'),true) }
      ],
      [ //7
        [
          "Brad, my friend, leave it to me. I will seek out the tree in the Enchanted Forest and bring it toppling to the ground.",
          "I believe it will open the way for my victory over the NDP and its nefarious anti-market ways."
        ],
        0,1,8,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Brad Wall'),true) }
      ],
      [ //8
        [
          "Go, Jason. The taxpayers and my well-heeled energy and agriculture industry clients are counting on you."
        ],  
        1,0,8,
        () => { this.game.npcFunctions.carbontree_quest_setup(); this.game.player.addQuest('kq-q-carbontree');  } //this.f.calgary_02_clearWay(); clearWay to be removed once quiz completed
      ],
      [ //9
        [
          "Jason! My sources tell me you have big things planned."
        ],
        0,0,9
      ]
    ],

    "Paula Simons": [
      [ //0
        ["Hi, there. I'm Paula Simons, an independent Senator from this fair city. Is there something I can help you with?",
        ],
        0, 0, 23,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Paula Simons'),false);
        }
      ],
      [ //1
        ["Ah, Edmonton! What a beautiful city. First incorporated as a town in 1892, it became Alberta's capital at the province's formation. It's always been a big centre for labour activity, as the NDP's strength here attests.",
        [ ['What is the source of Edmonton\'s power?',5],["I wish to crush the socialists!",4],['Tell me about the NDP',2],['Tell me about the UCP',3] ]
        ],
        1, 0, 1
      ],
      [ //2
        ["The NDP's prolonged period on the fringe of Alberta politics ended in 2015, when voters swept them into power. This was fitting, given Alberta was the NDP's birthplace and they'd never governed here provincially.",
        "There is speculation they were carried to power by prophecy, one foretold in the ancient scriptures of Alexander Rutherford, the province's first premier and reputed forger of the Crystals of Confederation.",
        "One such passage reads, 'Lo! When the governing institutions of this province have grown laggard and corrupt, from its heartland will rise a chinook so great as to lift the veil of democratic incontinence and let shine the sun on a new age.'",
        "Were the scriptures referring to a new age under the NDP or a reuniting of the Conservatives? Like many ancient texts, it's impossible to know for certain.",
        [ ["Definitely refers to Conservatives reuniting",11],["Tell me about Edmonton",1],["Tell me about the UCP",3] ]
        ],
        0, 0, 0
      ],
      [ //3
        ["The United Conservative Party is the major contender to Alberta's crown. Feelings on them throughout the province are mixed, with skeptics questioning whether the bickering strands of conservatism can truly remain united, especially if they take power from the NDP.",
        "After all, without the common animus of a socialist party in power, have the oft-differing conservative parties of Alberta have anything else to unite them beyond sputtering outrage?",
        [ ["*Pfft* Yes. A brilliant leader!",12],["Tell me about the NDP",2],["Tell me about Edmonton",1] ]
        ],
        0, 0, 0
      ],
      [ //4
        ["Oh my! Well, I suggest you calm down. But, yes, there are many, both progressives and Conservatives, who are fed up with them, just as is so often the case at this point in a government's lifespan.",
        "While the labour constituency has remained ardently on the NDP's side, the party under Queen Notley has alienated many other progressive groups over its support of pipeline construction. But, such are the tumultuous fortunes of politics.",
        [ ['What is the source of Edmonton\'s power?',5],['Tell me about the NDP',2],['Tell me about the UCP',3] ]
        ],
        0, 0, 0
      ],
       [ //5
        ["An intriguing question! If you believe the story of the Crystals of Confederation, you'd probably say its source emanates from the Crystal of Edmonton, formed from the mighty battle between the city and the former town of Strathcona, and now lost to time.",
          [ ['What might guide me to this crystal?',6],['What else can you tell me?',7] ]
        ],
        0, 0, 0
      ],
       [ //6
        ["You mean if we continued this hypothetical line of query? Well, I'd say you'd need an artifact so revered by Edmontonians as to be embued with its civic spirit. Like, say, a well-loved Oilers jersey.",
          "If the tales are to be believed, Edmontonians have long sworn breathlessly of the power wearing their team's sports jersey has imparted them with.",
          "Though I'm not a particularly sporty girl, so it's not something I'd be caught dead wearing.",
          "I like to speak my mind, but I'll be the first to admit I don't speak for everyone.",
          [ ['I require such a jersey!',9],['What else can you tell me?',7] ]
        ],
        0, 0, 0
      ],
      [ //7
        ["Well, Edmontonians love their foodtrucks. It's like they say: 'The way to a person's heart is through his or her stomach.'",
          "I'd wager a good portion of Edmontionans' strength - and by that I mean nutrition - comes from green onion cakes.",
          "In fact, they're beloved enough to make any Albertan politician give up everything, even cross the floor, for one!",
          "Rumour has it Danielle Smith was bribed over to the Progressive Conservatives from the Wildrose with just a single one!"
        ],
        0, 0, 8,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Paula Simons'),false);
        }
      ],
      [ //8
        ["Thank you for the advice, squishy-liberal-though-pipeline-supporting citizen.",
        "I prefer 'reasonably greenish,' and you're welcome."
        ],
        1, 1, 25, // change index node here to return greeting
        () => {
          this.f.edmonton_addFrontGateTileData();
        }
      ],
      [ //9
        ["Ah ha! I understand the proprieter of the cannabis shop across the way keeps one on display. It's his pride and joy!",
        "I can only imagine what unspeakable things he'd ask you to do for it...",
        "Totes kidding!"
        ],
        0, 0, 10,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Paula Simons'),false);
        }
      ],
      [ //10
        ["Thank you for the advice, squishy-liberal-though-pipeline-supporting citizen.",
        "I prefer 'reasonably greenish,' and you're welcome."
        ],
        1, 1, 27, 
        () => {
          //go to clare
          var clare = this.game.actions.getCharacter("Clare");
          clare.data.dI = 1;
          this.game.dialogue.initDialogue(null,clare,false);
        }
      ],
      [ //11 => Definitely refers to Conservatives reuniting (NDP thread)
        ["I imagine only time will tell. But I have to admit the NDP is vulnerable. And while I don't buy the common notion that Alberta is a naturally conservative province, the UCP is making fast progress.",
        "Outside of Edmonton -- dear Edmonton! -- the NDP is most vulnerable.",
        [ ["Tell me about those vulnerabilities",19],["I wish to crush the socialists!",4] ]
        ],
        0, 0, 11
      ],
      [ //12 =. *Pfft* Yes. A brilliant leader!
        ["The free market is the single source of Truth and the Invisible Hand is Its shepherd. Only the UCP honours the Hand's wisdom.",
        "The UCP talks a big game on the free market, making a great show of genuflecting before the Invisible Hand."
        ],
        1, 1, 13,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Paula Simons'),false);
        }
      ],
      [ //13
        ["In practice, however, they adhere to the free market mostly when it suits them, like any political party.",
        [ ['That\'s just not true!',14],["Keenly observed, scribe.",15] ]
        ],
        1, 0, 0
      ],
      [ //14
        [
          "Not true!",
          "Is that so? I don't see them giving up on their support for subsidies to the energy industry, do you?",
        [ ['It\'s the will of the Hand!',16],["Keenly observed, scribe.",15] ]
        ],
        1, 1, 0
      ],
      [ //15
        ["Thank you. It's worth adding that the governing NDP have been more free-market about cannabis consumption than anywhere else in Canada.",
        "The same laws for smoking a cigarette apply to cannabis here.",
        [ ['The NDP is dangerous',16],["Tell me about the NDP",2],["Tell me about Edmonton",1] ]
        ],
        0, 0, 0
      ],
      [ //16
        [
          "The NDP curries favour with dangerous groups. They hold hostage the Invisible Hand itself and know no other power than the flow of foreign money to their ideological causes!",
          "Their depravity is covered at length by the Sun newspapers."
        ],
        0,1,17,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Paula Simons'),false);
        }
      ],
      [ //17
        [
          "*Sigh* The freedom in our society to choose what we read is a wonderful thing.",
          "And if that's your attitude, you may be better off talking to Noah who guards the well outside.",
          "Funny man. Stridently anti-NDP."
        ],
      0,0,18,
      () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Paula Simons'),false);
        }
      ],
      [ //18
        [
          "Ah ha! This individual sounds like a valuable ally. Thank you for your time, progressive citizen.",
          "It is my humble duty."
        ],
        1,1,25,
        () => {
          this.f.edmonton_talkToNoah(4);
        }
      ],
      [ //19 => ndp explain thread
        [
          "Why, I suggest you read my columns! Or, better yet, take out a subscription with our fair newspaper.",
          "They're good for more than just wrapping artisanally crafted food from farmer's markets, after all.",
          [ ["Ba ha ha ha!",20],["What about personal vulnerabilities?",21] ]
        ],
        0,0,0
      ],
      [ //20 => ndp explain thread
        [
          "Say what you will about print, but, without a doubt in this case, the old school is best the school",
          "I get my news for free off the Internet, thanks... Or from the Sun."
        ],
        1,0,17,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Paula Simons'),false);
        }
      ],
      [ //21 => personal vulnerabilities
        [
          "What about vulnerabilities of a ... personal nature?",
          "That's an odd question! If you're looking to do physical harm, I'm afraid I can be of no help."
        ],
        1,1,0,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Paula Simons'),false);
        }
      ],
      [ //22
        [
          "But if you seek a richer and ... more poetic ... understanding of our province's political soul, there's a lot to be found in the ancient wisdom of finding the way to a person's heart through his or her stomach.",
          "It's my sincerest belief that the richness and variety of foodtrucks in our city is directly related to the inclinations of our province's politicians. The free market notwithstanding."
        ],
        0,0,10,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Paula Simons'),false);
        }
      ],
      [ //23 => entry after having spoken with activist
        [
          "Yes. I was sent your way by an anti-pipeline activist who claims you are a font of knowledge about Edmonton.",
          "Ah, yes. I imagine that they're quite disappointed in me, seeing as I support pipeline construction."
        ],
        1,1,24,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Paula Simons'),false);
        }
      ],
      [ //24
        [
          "I'm a squishy progressive so they understandably assumed I'd be on their side in that whole debate. But what can I say? I'm an Albertan.",
          "Anyway, what knowledge do you seek from me?",
          [ ['Tell me about Edmonton',1],['Tell me about the NDP',2],['Tell me about the UCP',3] ]
        ],
        0,0,0
      ],
      [ //25 => return to speak with paula
        [
            "I trust you're using the knowledge I imparted on you wisely."
        ],
        0,0,25
      ],
      [ //26 => default before activist sends player paula's way
        [
          "I do apologise, but I'm busy at present. These tweets won't write themselves, unfortunately!"
        ],
        0,0,26
      ],
      [ //27 => continue convo about Oilers jersey
        [
          "Ah! What you call body odour, Clare, I call civic pride!",
          "So what do you say? Do you want it?",
          [["I'll take it!",28],["Not a chance!",29]]
        ],
        0,0,27
      ],
      [ //28 => take jersey
        [
          "Ha ha! The power is mine!",
          "That's the spirit! Welcome to your first day of being a full-fledged Edmontonion!"
        ],
        1,1,25,
        () => {
          this.f.edmonton_jerseyAcquireFromSimons();
          //some additional scene to indicate you're drawn to legislature?
        }
      ],
      [ //29
        [
          "That's a perfectly reasonable answer.",
          "But if you don't mind, maybe talk to Noah outside by the well? He may want it and it would serve as a peace offering of sorts between us and him."
        ],
        0,0,25,
        () => {
          this.f.edmonton_talkToNoah(2);
        }
      ],
      [ //30
        [
          "Wowie! What a battle!",
          "The NDP and UCP armies arrived at Red Deer -- the convention capital of Alberta! -- drawn up in mighty battle array, the sun glinting off polished chrome and steel.",
          "Never did Alberta see anything more gallant, spruce or well-disposed as the two armies. Pickup truck horns and fifes made music such as Hell itself never heard.",
          "As the conflagration played out, the NDP lost ground to the united strength of the conservative army, just as pollsters and pundits alike had predicted leading into the conflict. Soon, the NDP were pushed back to Edmonton, but they were not out!",
          "NDP battalions in ridings across the province had yet to succumb to the UCP. By the time the conservative army had reached Edmonton, it was still uncertain who would win the day.",
          "And so the battle raged on. As Kenney made his way to claim his prize at the foot of the Alberta Legislature Building, Queen Notley awaited him, readying herself for the opportunity to destroy the Invisible Hand...",
          "...before the very person who'd returned to Alberta claiming to be its one, natural defender.",
          "This is independent Senator Paula Simons, signing off!"
        ],
        0,0,30,
        () => {
          this.game.mapWorld.changeStage(null,{
            targetMap: "kq02-battle-01",
            targetPosition: "284,1794"
          },"finalBattle_talkToSoldier");
        }
      ],

    ],

    "Ravi, Leader of all Millennials": [
      [ //0
        ["What is UP, guys? It's Ravi here, comin' atcha from Edmonton, City of Champiooooooons!",
        "Oh my God, you guys. I have with me here some peeps who JUST EMERGED from my friggin' basement. Like, what's up with that?!"],
        0, 0, 6,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"),false);
        }
      ],
      [ //1
        [
          "What is UP, guys? It's Ravi here, comin' atcha from Edmonton, City of Champiooooooons!",
          "Oh my God, you guys. I've got CUSTOMERS!",
          "Of course, not hard to find those at a cannabis retailer these days, amiright?"
        ],
        0,0,6,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false);
        }
      ],
      [ //2
        [
          "You're back! But you've got only one thing I asked for. I'm a chill dude, but you could've done better.",
          "Lucky for you, I'm into poke bowls and oatmeal now. Gotta keep up with what's trending.",
          "Here's your jersey. Wear it and you'll be guided to the source of Edmonton's power. Just do a better job looking for whatever it is you're after than you did getting me my lunch, 'k?"
        ],
        0, 0, 5,
        () => {
          this.game.score("avocadoToast",-2)
          this.f.avocadoToast_removeToast();
        }
      ],
      [ //3 => return to ravi with only 2 of 3 items (you don't get bonus points)
        [
          "You're back! But you've only got a couple of the things I asked for.",
          "Whatever. I'm a chill dude. Here's your jersey. Wearing it will guide you to the source of Edmonton's power, blah blah blah...."
        ],
        0,0,5,
        () => {
          this.game.score("avocadoToast",-1)
          this.f.avocadoToast_removeToast();
        }
      ],
      [ //4 => when you have all items
        [
          "Welcome back! And you have everything I asked for! Before I Instagram this bad boy, here's your jersey.",
          "Wear it and Edmontonians will rally around you, no matter what. Such is the magic embued in my well-loved jersey."
        ],
        0,0,5,
        () => {
          this.game.score("avocadoToast",1)
          this.f.avocadoToast_removeToast();
        }
      ],
      [ //5
        [
          "Good luck on your quest! I'm reading a Reddit thread that lists all the potential outcomes. But no spoilers! Ravi out!"
        ],
        0,0,30
      ],
      [ //6
        [
          "Hey customers! What is UP?",
          "Are...you talking to us?",
          "Heh. Yeah! You here to buy? I'm an independent retailer, licensed to sell the herb, the merch. You name it!",
          "Why are you in front of a camera?",
          "I've got my 24-hour personal diary vlog going on. This right here is how I sell cannabis CULTURE!"
        ],
        1,0,7,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false)
      ],
      [ //7
        [
          "Ganja's the new bitumen, baby, and I get MY product to market via broadband. No heavy infrastructure, just views and likes that carry my goods all the way to the consumer and their dollars back to me.",
          "Anyway, I can see you're just browsing. Super cool! Talk to me if you have any questions.",
          [["Just who...what...are you?",11],["I seek the source of Edmonton's power!",10],["None. Goodbye.",8]]
        ],
        0,0,8,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false)
      ],
      [ //8 => none goodbye 1  
        [
          "Laters."
        ],
        0,0,9
      ],
      [ //9 => return to ravi 1
        [
          "So...what is UP?",
          [["Just who...what...are you?",11],["I seek the source of Edmonton's power!",10],["Nothing. Goodbye.",8]]
        ],
        0,0,0
      ],
      [ //10 => seeking source of edmonton's power 
        ["The source of Edmonton's power? Like, the lost Crystals of Confederation? There's, like, this one, big Reddit thread all about it.",
        "How could this be?",
        "Yo, this one guy, cattleman6996, has this theory the Crystal of Edmonton is hidden right here in the city in a place that should be obvious, but it's not.",
        [ ["How would I locate this crystal?",16],["Just who...what...are you?",11] ]
        ],
        1,0,0
      ],
      [ //11
        [
          "I'm Ravi, Leader of all Millennials. My name's right there, in the dialogue window you're reading right now.",
          "What are you talking about?",
          "I'm just breaking the fourth wall. That's right! I see through the media paradigm."
        ],
        1,0,21,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false)
      ],
      [ //12
        [
          "Uh-huh? WELL. Right here in the Reddit thread on Kenney's Quest Episode 2, ableg_grrrrl writes that you're Jason Kenney in disguise come to Edmonton seeking one of the Crystals of Confederation. Is that right?",
          "Wait. Yes, but...",
          "So what you want from me is a means of finding one such crystal and I HAPPEN to have an enchanted Oilers jersey that will take you right to one."
        ],
        1,0,13,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false)
      ],
      [ //13
        [
          "HOWEVER, THIS decision tree only takes you to the Crystal of Edmonton.",
          "Decision tree? What sorcery is this? Trees are for logging and the creation of jobs!",
          "Hold up! This tree doesn't take you to the other crystal: the one you steal."
        ],
        1, 0, 22,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false)
      ],
      [ //14
        [
          "Try some of this Bubblegum Sundae strain. Or better, the Horseradish Garden Party. It's a kush. Very smooth.",
          "Smoke a little bit of that and you'll understand everything. I mean EVERYTHING.",
          "The cosmic matrix of decision trees that forms our unconscious universe...",
          "The player of this game, whose guiding hand limits and expands our horizon of possibilities. That's the REAL Invisible Hand, man..."          
        ],
          0,0,23,
          () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false)
      ],
      [ //15
        [
          "It's whacko theories like yours that are besieging our nation's Christian patrimony. I'll have none of it!",
          "Call it what you will, but things are changing. You gotta expand your mind, son. I've got this indica with a THC level through the roof that'll do just the thing...",
          [["I want your jersey!",16],["The only expansion that matters is the market's.",24]]
        ],  
        1,1,0
      ],
      [ //16
        [
          "The long lost, no-one's-ever-found-before crystals? THOSE ones?",
          "Totes! You'd need to channel the spirit of the city, as emboadied in an echanted item of some sort.",
          "As it so happens, my old Oilers jersey will do just that.",
          [["I want your jersey!",20],["Why don't you use it?",17]]
        ],
        0,0,0
      ],
      [ //17
        [
          "I'm a business owner! I don't have time for treasure hunting!",
          "Besides, harnessing mythical forms of power is a politician's game. I've got the REAL power in my hands: likes."
        ],
        0,0,25,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false)
      ],
      [ //18
        [
          "You'll be back. It's 'destiny'."
        ],
        0,0,19
      ],
      [ //19
        [
          "I knew you'd be back.",
          [["I want your jersey!",20],["I'm not actually talking to you.",18]]
        ],
        0,0,0
      ],
      [ //20
        [
          "Ah! You ARE here for something. Let's barter.",
          "Very well. What would you--",
          "Go get me lunch.",
          "What? Is that all?",
          "Yep. I don't ask for much in this world. I'm a simple man who pays his taxes and who's happy to pay more for the public benefit."
        ],
        1,0,26,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false)
      ],
      [ //21
        [
          "It's what I do. I'm a millennial! A thought-leader. A Ted-Xer.",
          "I'm an independent business owner, a hyphenated Canadian AND a member of the next generation of Albertans.",
          "Boom! Blew your mind.",
          [["It's a liberal media paradigm!",12],["I seek the source of Edmonton's power!",16]]
        ],
        0,0,0
      ],
      [ //22
        [
          "So YOU have to decide whether you want to retrieve the Crystal of Edmonton or take the other quest shown on this map.",
          "THAT quest will lead you along the tree that offers a greater number of possibilities for the completion of your quest. Got that?",
          [["I'm very confused.",14],["This is nonsense.",15],["I want your jersey!",20]]
        ],
        0,0,0
      ],
      [ //23
        [
          "Ha! The only cosmic force that matters is the market. And the Hand, its wise shepherd.",
          "Whatever you say. Try the kush?",
          [["I want your jersey!",20],["No, thanks. I'm off.",18]]
        ],
        1,1,0
      ],
      [ //24
        [
          "After all, what more is there to life than honest work and family values? The Hand gives its blessing to those who live by both.",
          "Uh-huh. So you'll try the indica?",
          [ ["I want your jersey!", 20],["Never! I'm off.", 18] ]
        ],
        1,1,0
      ],
      [ //25
        [
          "Then give me your jersey, boy!"
        ],
        0,1,20,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false)
      ],
      [ //26
        [
          "But your boy's gotta eat! I want avocado toast, the meal of my people.",
          "Get it with the works: eggs, bacon and Sriracha, the hot sauce of my people.",
          "Come back here when you've got that and at least ONE of those other things. You'll have to hunt for them.",
          "Then -- and ONLY then -- is the jersey that will lead you to near limitless power yours. Now, be off!",
        ],
        0,0,29,
        () => this.f.takeEdmontonQuest("kq-q-avocadotoast")
      ],
      [ //27
        [
          "...People?",
          "You got it! Come back here when you've got that or, y'know, whatever you manage to find. No big."
        ],
        1,1,28,
        () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Ravi, Leader of all Millennials"), false)
      ],
      [ //28
        [
          "Then -- and ONLY then -- is the jersey that will lead you to near limitless power yours.",
          "Now, be off!"
        ],
        0,0,29,
        () => {
          this.f.takeEdmontonQuest("kq-q-avocadotoast");
        }
      ],
      [ //29
        [
          "Get me my magical toast and at least one other item for it and the jersey's yours.",
          "But I'd prefer you get everything I asked for: eggs, bacon and Sriracha hot sauce. You'll have to hunt for them."
        ],
        0,0,29
      ],
      [ //30
        [
          "Ravi out!"
        ],
        0,0,30
      ]
    ],

    "Brewpub Owner": [
      [ //0
        ["Yes, sir! The beers we brew here are better than anything and everything they offer in Calgary."],
        0, 0, 0
      ],
      [ //1 => entry point for avocado toast quest
        ["My good man! I seek the fabled avocado toast -- the object of my demographic's fever dreams.",
        "Irony! Welcome to my establishment, fellow millennial!",
        "I am indeed one of you.",
        "Avocado toast coming right up. Try a free sample while you wait. I insist.",
        "Well, I -",
        "Come on. It's free. You're willing to go broke for this stuff ... aren't you?",
        "Why ... well, yes, of course..."
        ],
        1, 1, 0,
        () => {
          this.f.avocadoToast_buttonMashChallenge();
        }
      ]
    ],

    "Buck": [
      [ //0
        ["Jason Kenney's UCP is botulism incarnate."],
        0, 0, 0
      ],
      [ //1
        [
          "Meat? Why, I buy mine from the farmer's market vendor outside.",
          "His little stall is no Old Stratchona Market, but he'll do."
        ],
        0,0,2
      ],
      [
        [
          "I wouldn't normally advocate stealing eggs directly from their nest, but if I were in a simulated reality, *chuckle* that'd be another story."
        ],
        0,0,1
      ],
    ],



    "Priest of the Invisible Hand": [
      [ //0
        ["From the Scriptures of Rutherford, we sing..."],
        0, 0, 0
      ]
    ],

    "Cow": [
      [ //0
        ["Moo."],
        0, 0, 0
      ]
    ],

    

    "Priestess of the Invisible Hand": [
      [ //0
        ["Lo! Unto Albertans comes a boom in oil prices that brings with it great value to home properties and employment salaries!"],
        0, 0, 0
      ]
    ],

    "Doug Ford": [
      [ //0
        ["Jason! *Huff* *Wheeze*. Jason, ol' buddy, wait up!",
        "Oh. *Rolls eyes* Hello, Doug.",
        "I'd heard from a lot of folks you were headed out this way to take down that f$&*@ing Carbon Tax Tree and I knew I needed to help.",
        "*Grimacing* Yeah. Well. Just stand beside me and smile.",
        "Let's ally ourselves. You go on ahead. I've got my Escalade parked nearby. If you need help just holler." ,
        "Uh-huh. THANKS, Doug..."
        ],
        1,0,1
      ],
      [ //1 
        [
          "Jason! I've heard from folks here in Alberta that I am the ONLY Ontarian they'd be happy to have come here and tell them what to do.",
          "And there's nothing I love more than telling people what to do!",
          "Now go cut us down that carbon tree!"
        ],
        0,0,2,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Doug Ford'),true) }
      ],
      [ //2
        [
          "Now go cut us down that carbon tree!"
        ],
        0,1,3
      ],
      [//3
        [
          [
            "I'll just be in my Escalade reading the Toronto Sun."
          ]
        ],
        0,1,2
      ],
      [ //4
        [
          "Dammit. I'll get the Sun to write something up for me."
        ],
        0,0,4
      ],
      [ //5
        [
          "Jason! Jason! *Huff* *Puff* Wait up, buddy!",
          "Ow! My knees..."
        ],
        0,0,6,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Doug Ford'),true) }
      ],
      [ //6
        [
          "*Sigh* Doug, you're...still here.",
          "I wouldn't miss a chance to take a swipe at Trudeau, you know what I mean?",
          "Yeah, yeah...",
          "Oof! Big tree! It'll look good as bbq fuel at my next Fordfest. Whaddaya think of THAT, Jason!",
          "Whatever...",
          "So...what are we gonna do about it?"
        ],
        1, 1, 6,
        () => {
          let dofo = this.game.actions.getCharacter('Doug Ford');
          let dI = this.game.player.hasItem('axe')?7:8;
          dofo.data.dI = dI;
          this.game.dialogue.initDialogue(null, dofo, true);
        }
      ],
      [ //7
        [
          "The conservative GODS -- who speak to ME, Doug. ME! -- led me to the location of the mythical Great Carbon Tax Axe, which I now hold in my possession.",
          "It is a uniquely powerful magical item forged specifically to fell this BLIGHT upon free-market values.",
          "And I will be the one to wield it. Here goes!"
        ],
        0,1,9,
        () => { this.f.greatTree_removeTree(10) } //kenney wins
      ],
      [ //8
        [
          "I...I don't actually know.",
          "Ba ha ha. BA HA HA HA!"
        ],
        0,1,9,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Doug Ford'),true) }
      ],
      [ //9
        [
          "I've got one of my lackeys waiting in my Escalade just outside the forest.",
          "We're gonna hitch that puppy up to this tree and bring 'er crashing down!'",
          "Folks'll LOVE it! I'm calling up the Sun right now to give 'em an exclusive about how ol' Dougie gave a finishing right-hook to the carbon enchantment."
        ],  
        1,0,11,
        () => {
          this.game.score("carbonTreeDoug",-2);
          this.f.greatTree_dougRunsOff();
        }
      ],
      [ //10 // kenney wins
        [
          "This...is a good day for democracy.",
          "Hoo hoo! Lame-o Justin's going to be so mad!"
        ],
        1,1,11,
        () => {
          this.game.score("carbonTreeDoug",4);
          this.f.call_calgary_scrum('kenney')
        }
      ],
      [ //11 // kenney loses
        [
          "Ugh. At least I recovered the crystal...",
          "Hoo hoo! Lame-o Justin's going to be so mad!"
        ],
        1,1,12,
        () => { this.f.call_calgary_scrum('ford') }
      ],
      [ //12 // scrum begins and ford wins
        [
          "As I pledged during my campaign for Grand Duke of Ontario, I and, uh, Jason here...",
          "... have cleared the Enchanted Forest of Regulations of the hated Carbon Tax Tree.",
          "The tree was THE WORST magical enchantment Canada could ever have.",
          "Folks, Ford Nation made a promise, and Ford Nation, as always, has delivered. Did you get that, you CBC hacks?"
        ],
        0, 0, 13,
        () => { 
          var reporter = this.game.actions.getCharacter('CBC Reporter');
          reporter.data.dI = 2;
          this.game.dialogue.initDialogue(null,reporter, false,null,true);
        }
      ],
      [ // 13
        [
          "Thank you! Thank you! No more questions."
        ],
        0,0,14,
        () => {
          var reporter = this.game.actions.getCharacter('Other Reporter');
          this.game.dialogue.initDialogue(null, reporter, false, null, true);
        }
      ],
      [ // 14
        [
          "No more questions! I'm in charge!"
        ],
        0,0,15,
        () => {
          var reporter = this.game.actions.getCharacter('Other Reporter');
          this.game.dialogue.initDialogue(null, reporter, false, null, true);
        }
      ],
      [ // 15
        [
          "Don't you twerps get it? I'M IN CHARGE!!",
          "Minions! Silence the media at once."
        ],
        0,0,15,
        () => { this.f.ford_exits_scrum() }
      ],
      [ // 16
        [
          "Outta my way, Jason. Let a pro handle this.",
          "Folks, I am a MAN. And guys like Jason here want to be like me.",
          "So when I stood up to the elites in my own party and convinced them to reverse their commitments to this job-killing enchantment, Alberta's Conservatives...",
          "...who recognise me as a champion of their industries and jobs, but first and foremost as a REALLY MANLY MAN,...",
          "...Alberta's Conservatives told me they wanted me in their corner. ME. THE MANLIEST MAN OF ALL!",
          "That's it for questions. I'm in charge. Everyone do what I say."
        ],
        0,0,17,
        () => { this.f.ford_exits_scrum() }
      ]
    ],
    "Other Reporter" : [
      [ // 0
        [
          "Mr. Ford! Legal opinion finds the Supreme Court will likely side with Ottawa on imposing the carbon tax enchantment in absence of the tree.",
          "Do you care to comment?"
        ],
        0,0,1,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Doug Ford"), false, null, true); }
      ],
      [ // 1
        [
          "But, Mr. Ford --"
        ],
        0,0,2,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Doug Ford"), false, null, true); }
      ]
    ],
    "CBC Reporter" : [
      [ //0
        [
          "Sir Kenney. Your messaging on carbon enchantments has been unclear.",
          "You've said you, in fact, SUPPORT an enchantment, just one implemented differently from what Queen Notley's NDP has done?"
        ],
        0,0,1,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("CBC Reporter"),false) }
      ],
      [ //1
        [
          "I'm not opposed, in principle, to enchanting major emitters with a spell requiring they pay more...",
          "Like the Specified Gas Emitters Regulation? You've said you'd prefer it yet it also requires industry to pay for emissions, so can you clarify?",
          "Look, the Enchanted Forest of Regulations is deep, dark and full of trees. Let's not lose ourselves amongst them..."
        ],
        1, 1, 3,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Doug Ford"),false,null,true) }
      ],
      [ //2
        [
          "Mr. Ford! Legal experts have indicated the federal government has the authority to IMPOSE the carbon tax enchantment on the entire Dominion, despite your having felled the tree.",
          "Do you intend to spend deeply in a battle against Emperor Trudeau that you may already have lost?"
        ],
        0, 0, 3,
        () => { this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Doug Ford"), false, null, true); }
      ]
    ],
    "The Invisible Hand": [
      [ //0
        [
          "Time and again, Hand, you've failed Albertans. The previous government's unquestioning belief in your vagaries brought suffering to this province's people. But no more.",
          "The NDP will soon wipe you from the cosmos."
        ],
        0,1,1,
        () => {
          var hand = this.game.enemyGroup.children[this.game.enemyGroup.children.length - 1];
          hand.data.dI = 1;
          this.game.dialogue.initDialogue(null, hand, false, null, true) //...children[3] is invisible hand
          //this.f.kenneyReturn_beginQuest_changeStageCall();
        }
      ],
      [ //1
        [
          "ROAR!! THE MARKET WILL NOT STAND FOR THIS! I WILL PUNISH ALBERTA WITH INDISCRIMINATE POVERTY FOR GENERATIONS TO COME!",
          "The days of Alberta being subject to your whims are over, Hand. Only Jason Kenney now stands between Albertans and a better future. The NDP is destined to prevail."
        ],
        1,0,1,
        () => {
          // return to kenney main quest line
          this.f.kenneyReturn_beginQuest_changeStageCall();
        }
      ],
      [ //2
        [
          "ROAR! You puny mortals have defied the Hand!",
          "For your arrogance, I will make Alberta suffer a market downturn so great as to take its economy back 200 years!",
          "Alberta will yearn for the good old days when it complained about paying equalization to the other provinces."
        ],
        0,0,3,
        () => {
          this.game.dialogue.initDialogue(null,{
            data: {
              name: "The Invisible Hand",
              dI: 3,
              character: "The Invisible Hand"
            }
          },false);
        }
      ],
      [ //3
        [
          "No! Oh, glorious Hand! That is --",
          "SILENCE!"
        ],
        1,1,4,
        () => {
          this.game.dialogue.initDialogue(null,{
            data: {
              name: "The Invisible Hand",
              dI: 4,
              character: "The Invisible Hand"
            }
          },false);
        }
      ],
      [ //4
        [
          "That is the will of the Hand to which you have pledged your faith, mortal!",
          "From now on, Albertan liquor stores will stock nothing but second-rate rose from Ontario."
        ],
        0,0,5,
        () => {
          this.game.dialogue.initDialogue(null,{
            data: {
              name: "The Invisible Hand",
              dI: 5,
              character: "The Invisible Hand"
            }
          },false);
        }
      ],
      [ //5
        [
          "No ... no!",
          "Albertans will drive only Pontiac Aztecs. Prices for synthetic crude will plummet! Taxes will soar!",
          "Gah! No! *sob*"
        ],
        1,1,6,
        () => {
          this.game.dialogue.initDialogue(null,{
            data: {
              name: "The Invisible Hand",
              dI: 6,
              character: "The Invisible Hand"
            }
          },false);
        }
      ],
      [ //6
        [
          "The Hand! Why have you foresaken us?",
          "The market will not be controlled by insignificant mortals. Government revenues will not be diversified. Only unbridled faith in my will can rule Alberta for I am its Master!"
        ],
        1,1,7,
        () => {
          this.game.dialogue.initDialogue(null,{
            data: {
              name: "The Invisible Hand",
              dI: 7,
              character: "The Invisible Hand"
            }
          },false);
        }
      ],
      [ //7
        [
          "Conservative might alone will not defeat the Hand. I must use my sword forged from the crystals of confederation. But is it enough to defeat you, Hand?",
          "I have no choice but to find out..."
        ],
        0,1,8,
        () => {
          this.game.dialogue.initDialogue(null,{
            data: {
              name: "The Invisible Hand",
              dI: 8,
              character: "The Invisible Hand"
            }
          },false);
        }
      ],
      [ //8
        [
          "HAVE AT THEE, PEASANT!"
        ],
        0,0,9,
        () => {
          this.f.finalBoss_endCutscene();
        }
      ]
    ],
    "Leela Aheer": [
      [ //0
        [
          "Sir Kenney! Uniter of Alberta's Right!",
          "Vanquisher of government overreach!",
          "Slayer of deficits!",
          "What is it you would ask of this faithful candidate?"
        ],
        0,0,1,
        () => { this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Leela Aheer"),false) }
      ],
      [ //1
        [
          "Leela, my FAVOURITE candidate for Chestermere-Strathmore. It was a bitter fight to secure your place in that riding, but the effort was worth it.",
          "I'm humbled and grateful, my liege.",
          [["I am on a quest.",2],["You've been instrumental.",5  ]]
        ],
        1,1,2
      ],
      [ //2
        [
          "What would that be?",
          "I am on a quest to recover the lost Crystals of Confederation. Keep it secret.",
          "Jason, after you placed so much confidence in me I would never betray you."
        ],
        1,0,5,
        () => this.game.score("leelaSecret",1)
      ],
      [ //3 => entry point for journey to edmonton
        [
          "I may have the stature of a mouse, but I carry in me the soul of a lioness, Sir, Kenney, Sir!"
        ],
        1, 0, 3,
        () => {
          // harper now speaks
          var harper = this.game.actions.getCharacter("Stephen Harper");
          harper.data.dI = 11;
          this.game.dialogue.initDialogue(null,harper,false);
        }
      ],
      [ //4 => not chosen
        [
          "I will serve you when the battle comes, my liege!"
        ],
        0,0,4
      ],
      [ //5
        [
          "Leela, you've been instrumental in building our party into one of the most popular political parties in Canada.",
          "Shucks. Go on.",
          "I mean it! And, my goodness, do we need women representatives in our party.",
          "Ha ha. Yeah...yeah, we do.",
          "Oh, yes! Do we ever.",
          "*sigh* Yeah... Do. We. Ever.",
          "I mean, we have only two female MLAs in the party!",
          "It's absurd.",
          "And the NDP have, like, over 50% female representation in its cabinet.",
          "Mm-hmm.",
          "But we can't compromise on our principle of MERIT over an ideological feminist agenda.",
          "Of course not.",
          "Leela, I'm glad you agree.",
          "Agreeing with you is what we UCP MLAs do, my liege.",
          "Very good! Carry on, Leela. Glory to the Hand!"
        ],
        1,1,4
      ],
      [ //6
        [
          "Let us go forth and conquer, my liege!"
        ],
        0,0,6
      ],
      [ //7 => change costume in edmonton
        [
          "Let us don our disguises. For Edmonton is a dangerous place and it's imperative we Conservatives blend in."
        ],
        0,1,7,
        () => {
          //costume change function
          this.f.edmonton_initDisguises();
        }
      ],
      [ //8 => stock comment on disguise
        [
          "Ugh. I smell like a thrift store."
        ],
        0,0,8
      ],
      [ //9 => convo for Edmonton crystal discovery
        [
          "Leela! I sense a pull from the jersey.",
          "Are you sure there aren't any rats nesting in there?",
          "Nay! Come, let's dig up the ground here."
        ],
        1,1,10,
        () => {
          this.f.edmonton_crystal_uncovery();
        }
      ],
      [ //10 => scene that gets duo out of Edmonton
        [
          "Well, we've got the crystal. Let's go!"
        ],
        0,1,10,
        () => {
          //escape from edmonton
          this.f.edmonton_crystal_escape();
        }
      ],
      [ //11 => return to calgary after acquiring last crystal
        [
          "Hey"
        ],
        0,0,11
      ],
      [ //12 => entry point for crystal of social license acquisition
        [
          "I admit I have no clue what to do with this thing.",
          "Is social license even a thing?",
          "Never mind. It obviously has some form of power alien to Conservatives. Let us make haste back to Calgary, and commence with our siege!"
        ],
        1, 1, 12,
        () => {
          this.game.score("socialLicenseCrystal",-2);
          this.f.edmonton_crystal_escape();
        }
      ],
      [ //13=> convo taking you to Paula Simons after enviro rejects you
        [
          "Sir, we ought to go.",
          "But I hear whisperings that the wise Senator, Paula Simons, possesses great knowledge of the city.",
          "Let us seek her out."
        ],
        0,0,14,
        () => {
          this.f.edmonton_setPaulaQuestNode();
        }
      ],
      [ //14
        [
          "Let us seek out the wise woman Paula Simons."
        ],
        0,0,14
      ],
      [ //15 => after trudeau-notley photo taken
        [
          "If you had a moustache, now would be the perfect time to twirl it, sir."
        ],
        0, 0, 8,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Gabby"),false);
        }
      ],
      [ //16 => return after notley party on stage
        [
          "Look at her. Currying favour to her base through frivolity. Albertan politicians ought to be above such nonesense.",
          "Personally, I find your bland but steady style of leadership inspiring, sir.",
          "Thank you, Leela."
        ],
        1,1,17
      ],
      [ //17 =>post-ndp scene comment 
        [
          "We must find a way to steal one of the NDP's crystals or uncover a new one.",
          "Where to begin...?"
        ],
        0,0,17
      ],
      [ //18 => jersey pulling you comment
        [
          "Hark! I feel the jersey's power, Leela. It compels us to seek out the Legislature building to the west.",
          "Onwards, sir!"
        ],
        1, 1, 19
      ],
      [ //19
        [
          "To the Legislature!"
        ],
        0, 0, 19
      ],
      [ //20
        [
          "By the Hand! The Crystal of Edmonton is ours, and with it, the hearts of the people of this great city.",
          "Which you don't say to argue against the inherent superiority of Calgary, do you, sir?",
          "Uh, no. No, of course not. Now, let us return there at once!"
        ],
        1,1,20,
        () => {
          this.game.score('edmontonCrystal',1)
          this.f.edmonton_crystal_escape();
        }
      ],
      [ //21
        [
          "Is that...Queen Notley's dragon?!"
        ],
        0,0,0,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Derek Fildebrandt"),false)
      ],
      [ //22
        [
          "There it is! The mighty Hand, held at bay by socialist sorcery.",
          "Master Harper claims taking this crystal won't free the Hand just yet. Only by besieging Edmonton and taking control of all the crystals will the power be great enough to free the Hand.",
          "But for now, this crystal will be enough..."
        ],
        0,1,0,
        () => this.f.edmonton_takeSocialLicenseCrystal()
      ],
      [ //23
        [
          "The jersey's pull is drawing me to the fountain before us!"
        ],
        0,1,23
      ]
    ],

    "Sady": [
      [ // 0
        [
          "The Alberta Liberal Party isn't out of the running yet. Just you wait."
        ],
        0,0,0
      ]
    ],

    "Chet": [
      [ // 0
        [
          "Don't let the fact that we're working in total isolation fool you: The Alberta Liberals are still relevant!"
        ],
        0,0,0
      ]
    ],

    "Zain Velji": [
      [ // 0
        [
          "Queen Notley! Welcome to the Stratejesters, episode fiiiiive-ninety-six. With me, as always, are --",
          "I know! I know! I don't have time for this, jesters. Dispense with your wisdom, if you *ahem* care to call it that."
        ],
        1,0,1,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Stephen Carter"),false)
      ],
      [ //1
        [
          "Despite not having recorded a new episode in two years."
        ],
        0,0,2,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Stephen Carter"),false,false,true)
      ],
      [ //2
        [
          "Guys, the stakes just got pretty high..."
        ],
        0,0,0,
        () => {
          var hogan = this.game.actions.getCharacter("Corey Hogan");
          hogan.data.dI = 4;
          this.game.dialogue.initDialogue(null,hogan,false);
        }
      ],
      [ //3
        [
          "I'm with Carter on this one. We live in a society that's inherently pluralistic and your average Alberta voter recognizes Kenney for what he is.",
          "Whether that's enough for them to vote against him remains to be seen."
        ],
        0,0,0,
        () => {
          var hogan = this.game.actions.getCharacter("Corey Hogan");
          hogan.data.dI = 7;
          this.game.dialogue.initDialogue(null,hogan,false);
        }
      ],
      [ //4
        [
          "If I could add something? It's worth pointing out the lip service Conservatives have paid to the Hand, even while supporting subsidies for the energy industry.",
          "No government in Alberta has truly ever given 100% of their soul to the Invisible Hand, but it's been in their interest to make great hay of it."
        ],
        0,0,0,
        () => {
          var targ = this.game.actions.getCharacter("Stephen Carter");
          targ.data.dI = 10;
          this.game.dialogue.initDialogue(null,targ,false);
        }
      ],
      [ //5
        [
          "But this is what the power of the crystals is all about..."
        ],
        0,0,0,
        () => {
          var carter = this.game.actions.getCharacter("Stephen Carter");
          carter.data.dI = 11;
          this.game.dialogue.initDialogue(null,carter,false);
        }
      ],
      [ //6
        [
          "Use your eyes, Carter. There's a giant hand floating in place thanks to a big crystal beneath it. The crystals are real.",
          "And this government's going to use them to eliminate THE VERY THING that has kept Alberta locked in a vicious cycle of boom and bust.",
          "It can only mean a better regulated and predictable economy from here on out."
        ],
        0,0,0,
        () => {
          var carter = this.game.actions.getCharacter("Stephen Carter");
          carter.data.dI = 13;
          this.game.dialogue.initDialogue(null,carter,false,false,true);
        }
      ],
      [ //7
        [
          "Yes, it is, now that you're making it one!",
          "That's enough, jesters. Answer my other questions:",
          [["Military strategy.",8],["Countering Jason Kenney.",9],["I've heard enough.",10]]
        ],
        1,0,0
      ],
      [ //8
        [
          "I think Corey wants to answer this one."
        ],
        0,0,0,
        () => {
          var hogan = this.game.actions.getCharacter("Corey Hogan");
          hogan.data.dI = 1;
          this.game.dialogue.initDialogue(null,hogan,false);
        }
      ],
      [ //9
        [
          "I think Carter wants to answer this one."
        ],
        0,0,0,
        () => {
          var carter = this.game.actions.getCharacter("Stephen Carter");
          carter.data.dI = 8;
          this.game.dialogue.initDialogue(null,carter,false);
        }
      ],
      [ //10 => goodbye
        [
          "Alright! We'll leave it there. That's a wrap on episode 596 of the Stratejesters.",
          "My name is Zain Velji. With me, as always: Stephen Carter, Corey Hogan. And we'll see you next time."
        ],
        0,0,11
      ],
      [ //11
        [
          "No. There will NOT be an episode 597."
        ],
        0,0,11
      ],
      [ //12
        [
          "Ah-ha. Right you are, Queen Notley.",
          "Guys, you heard her..."
        ],
        0,0,0,
        () => {
          var carter = this.game.actions.getCharacter("Stephen Carter");
          carter.data.dI = 15;
          this.game.dialogue.initDialogue(null,carter,false,false,true);
        }
      ]
    ],
    "Stephen Carter": [
      [ // 0
        [
          "Well, hello to you, too!"
        ],
        0, 0, 1,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Corey Hogan"),false,false,true)
      ],
      [ //1
        [
          "All because of Corey.",
          "That's enough! Tell me the answers I seek:",
          [ ["Military strategy.",2],["Countering Jason Kenney.",8],["Destroying the Invisible Hand.",9] ]
        ],
        1,0,2
      ],
      [ //2
        [
          "What are my options for a full-scale military assault on Jason Kenney's forces?"
        ],
        1,1,2,
        () => {
          var hogan = this.game.actions.getCharacter("Corey Hogan");
          hogan.data.dI = 1;
          this.game.dialogue.initDialogue(null,hogan,false);
        }
      ],
      [ //3
        [
          "No. No, we're not! Corey, we are knowledgeable people who have knowledge on all knowable subjects. That's what we're paid for."
        ],
        0,0,4,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Corey Hogan"),false,false,true)
      ],
      [ //4
        [
          "It's not lying. It's called presenting the client with ... a creative narrative!",
          "My instinct is to concentrate my battalions in Calgary's winnable ridings where we have the best support."
        ],
        1,0,5,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Corey Hogan"),false,false,true) 
      ],
      [ //5
        [
          "Your chances in Calgary are slimming the more you ignore the city. Calgarians feel you've forgotten them. My two cents.",
          [ ["How have I failed?",6],["I will have you liquidated.",7] ]
        ],  
        1,0,5
      ],
      [ //6
        [
          "You've been so busy campaigning in Edmonton, Calgary's been almost an afterthought. Calgarians don't know you.",
          "Spend more time there personally, and don't just rely on your MLAs.",
          "Overall, your best strategy is to be popular. Once people know and trust you, they'll the do the heavy lifting for you, meaning you won't have to invade.",
          "The ridings will already be yours.",
          [ ["Countering Jason Kenney",8],["Destroying the Invisible Hand.",9],["I've heard enough.",16] ]
        ],
        0,0,0
      ],
      [ //7
        [
          "Ah, c'mon!",
          "I am a compassionate queen, but even I have my limits. I have the stocks reserved for you if you fail to provide me relevant counsel.",
        ],
        1,0,0,
        () => {
          var targ = this.game.actions.getCharacter("Zain Velji");
          targ.data.dI = 2;
          this.game.dialogue.initDialogue(null,targ,false);
        }
      ],
      [ //8 => undermining jason kenney
        [
          "Jason Kenney's a callous opportunist and it's going to get the better of him.",
          "Remember the barbaric cultural practices hotline in the 2015 federal election? Kenney's idea.",
          "He's not openly welcoming racists into his 'big tent' conservative party, but something's attracting them. Thankfully, in 2015, it cost the federal Conservatives big.",
          "Albertan voters are savvy to the dog whistling and it's a major vulnerability for Kenney as a result."
        ],
        0,0,0,
        () => {
          var horgan = this.game.actions.getCharacter("Corey Hogan");
          horgan.data.dI = 6;
          this.game.dialogue.initDialogue(null,horgan,false);
        }
      ],
      [ //9 => destroying the invisible hand. To Corey
        [
          "Oh, ho ho! I know Corey wants to answer this one."
        ],
        0,0,0,
        () => {
          var horgan = this.game.actions.getCharacter("Corey Hogan");
          horgan.data.dI = 8;
          this.game.dialogue.initDialogue(null,horgan,false);
        }
      ],
      [ //10
        [
          "It's not going to work. Unless you can get Albertans to accept a provincial consumption tax, killing the conservative god will have no effect.",
          "Because as Zain was saying, the Invisible Hand is just something 'free market' Albertans -- or whatever Kenney's calling them -- pay lip service to only."
        ],
        0,0,0,
        () => {
          var targ = this.game.actions.getCharacter("Zain Velji");
          targ.data.dI = 5;
          this.game.dialogue.initDialogue(null,targ,false);
        }
      ],
      [ //11
        [ 
          "Both the NDP and UCP have denied they're looking for these alleged crystals. I don't know if they're real or not..are they real?",
          [["Absolutely not.",14],["Yes.",12]]
        ],
        0,0,0
      ],
      [ //12
        [
          "Alright! So I'm wrong. But that's not the point.",
          "The point is..."
        ],
        0,0,0,
        () => {
          var targ = this.game.actions.getCharacter("Zain Velji");
          targ.data.dI = 6;
          this.game.dialogue.initDialogue(null,targ,false,false,true);
        }
      ],
      [ //13
        [
          "This isn't a debate about the validity of the crystals..."
        ],
        0,0,0,
        () => {
          var targ = this.game.actions.getCharacter("Zain Velji");
          targ.data.dI = 7;
          this.game.dialogue.initDialogue(null,targ,false,false,true);
        }
      ],
      [ //14
        [
          "Ok! I don't know about you guys, but I'm satisfied with that denial. So there are no crystals.",
          "The NDP is f#&@*d. My queen, what you really need is divine intervention from supernatural powers."
        ],
        0,0,0,
        () => {
          var horgan = this.game.actions.getCharacter("Corey Hogan");
          horgan.data.dI = 9;
          this.game.dialogue.initDialogue(null,horgan,false,false,true);
        }
      ],
      [ //15
        [
          "I'm looking away. I'm not seeing anything!",
          "All I'll say is Calgary's bid for the Global Gladiatorial Games would have brought in a range of different investment opportunities.",
          "It would have been a practicle solution to encouraging diversification of investment in this province. That's it.",
          "You want to destroy the Invisible Hand? There's your alternative.",
          [["Military strategy.",2],["Countering Jason Kenney.",8],["I've heard enough.",16]]
        ],
        0,0,0
      ],
      [ //16
        [
          "Back to you, Zain."
        ],
        0,0,0,
        () => {
          var targ = this.game.actions.getCharacter("Zain Velji");
          targ.data.dI = 10;
          this.game.dialogue.initDialogue(null,targ,false,false,true);
        }
      ]
    ],
    "Corey Hogan": [
      [ // 0
        [
          "That's not the welcome I'd have expected for the podcast voted most favourite by Calgarians in 2018."
        ],
        0, 0, 1,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Zain Velji"),false,false,true)
      ],
      [ //1
        [
          "*Cough* We're out of our depth on that one--"
        ],
        0,0,2,
        () => {
          var carter = this.game.actions.getCharacter("Stephen Carter");
          carter.data.dI = 3;
          this.game.dialogue.initDialogue(null,carter,false,false,true);
        }
      ],
      [ //2
        [
          "But we can't just lie..."
        ],
        0,0,3,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Stephen Carter"),false,false,true)
      ],
      [ //3
        [
          "You've got to keep your ridings in Calgary. If you can claim the beachheads there, your victory is a minority government.",
          "That's the best outcome. Edmonton's your base. It's locked down, barring some catastrophic invasion by the UCP.", 
          "But if you're willing to dedicate resources to the ground fight in Calgary, especially the suburbs, you have a chance."
        ],
        0,0,4,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Stephen Carter"),false,false,true) //to 5
      ],
      [ //4
        [
          "So none of your bullshit, Carter.",
          [["Countering Jason Kenney",5],["Destroying the Invisible Hand.",8],["I've heard enough.",10]]
        ],
        0,0,0
      ],
      [ //5
        [
          "I think Carter's got a lot to say on this subject."
        ],
        0,0,0,
        () => {
          var carter = this.game.actions.getCharacter("Stephen Carter");
          carter.data.dI = 8;
          this.game.dialogue.initDialogue(null,carter,false);
        }
      ],
      [ //6
        [
          "Look. I wish he weren't, but Carter's wrong and here's why.",
          "Xenophobia, unfortunately, works. Fear as a motivator has staying power.",
          "I'd like to think Canadians and Albertans voters are above that, but UCP support's been growing in spite of all the UCP shenanigans with racist nominees.",
          "Kenney blows his dog whistle and supporters come a-running."
        ],
        0,0,0,
        () => {
          var targ = this.game.actions.getCharacter("Zain Velji");
          targ.data.dI = 3;
          this.game.dialogue.initDialogue(null,targ,false);
        }
      ],
      [ //7
        [
          "Listen. This is less a campaign about local MLAs than it is about you versus Kenney.",
          "From what I've seen, you've been doing it right: going hard on Kenney for inviting racists into his party's tent.",
          [ ["Military strategy.",1],["Destroying the Invisible Hand.",8],["I've heard enough.",10] ]
        ],
        0,0,0
      ],
      [ //8
        [
          "I'm telling ya, destroying the Invisible Hand is the best idea an Albertan government has had for a long time.",
          "Every government has wanted to diversify in order to soften the Invisible Hand's influence but failed. Why? Free market dogma."
        ],
        0,0,0,
        () => {
          var zain = this.game.actions.getCharacter("Zain Velji");
          zain.data.dI = 4;
          this.game.dialogue.initDialogue(null,zain,false,false,true);
        }
      ],
      [ //9
        [
          "Use your eyes, Carter. There's a giant hand floating in place thanks to a big crystal beneath it.",
          "There's nothing to see over there. Look away."
        ],
        1,0,0,
        () => {
          var zain = this.game.actions.getCharacter("Zain Velji");
          zain.data.dI = 12;
          this.game.dialogue.initDialogue(null,zain,false,false,true);
        }
      ],
      [ //10
        [
          "Back to you, Zain."
        ],
        0,0,0,
        () => {
          var targ = this.game.actions.getCharacter("Zain Velji");
          targ.data.dI = 10;
          this.game.dialogue.initDialogue(null,targ,false);
        }
      ]
    ],

    "Nathan": [
      [ // 0
        [
          "Green justice!"
        ],
        0,0,1
      ],
      [ //1
        [
          "The tar sands are Mordor!"
        ],
        0,0,0
      ]
    ],

    "Gabby": [ // get kq-q-environment
      [ // 0
        [
          "Greetings, fellow voter in the aged 18-34 demographic! How are you advancing the liberal agenda today?",
          "We're here on behalf of the Order of Gaia and its illustrious leader Tzeporah Berman to protest the Notley government's lies."
        ],
        1, 1, 2,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Gabby"),false);
        }
      ],
      [ // 1 => entry point without quest
        [
          "Notley, the media...the whole Alberta establishment is against safe, responsible stewardship of the environment."
        ],
        0, 0, 1
      ],
      [ // 2
        [
          "Her government's pipeline projects are a slap in the face to the many concerned citizen groups the NDP has previously worked with to ensure safe and responsible development of Alberta's resources.",
          "Instead, Queen Notley has proven herself a Judas to the environment.",
          [
            ["Tell me about Tzeporah Berman", 3],
            ["Tell me about Queen Notley", 4],
            ["I seek knowledge about Edmonton", 5]
          ]
        ],
        0, 0, 2
      ],
      [ //3 => Tzeporah Berman
        [
          "Freedom fighter Tzeporah Berman is the leader of our order. Her activism is both celebrated and reviled throughout Canada.",
          "Despite the hatred cast at her, she carries on, undeterred.",
          "Those same people who would silence her from holding an honest discussion about Alberta's energy policies would cry 'foul' over alleged free speech violations everywhere else as though they were free speech's biggest defenders.",
          "If hypocrisy were a deity those alleged 'defenders' would worship at its feet.",
          [["Tell me about Queen Notley",4],["I seek knowledge about Edmonton",5]]
        ],
        0,0,3
      ],
      [ //4 => Queen Notley
        [
          "On every front, Queen Notley has abandoned environmentalists, just lately having pulled out of the federal climate plan. What petulance!",
          "The Emperor Trudeau will impose one all the same and she knows that.",
          "We had a lot of hope when the NDP took power in 2015. But she's failed environmental groups, First Nations and Gaia Herself!",
          [["Tell me about Gaia",6],["Tell me about Tzeporah Berman",3],["Tell me about Emperor Trudeau",7]]
        ],
        0,0,4
      ],
      [ //5 => knowledge of edmonton
        [
          "Um...ok. Edmonton is Alberta's best city. That's about all you need to know.",
          "I'll add that it's got culture and nature that far surpasses anything you'll find in Calgary...",
          "But your question has nothing to do with our demonstration here. Why are you asking?",
          [["I wish to exploit the city's weaknesses",11],["I wish to understand the city's greatness",12]]
        ],
        0,0,5
      ],
      [ //6 => Gaia
        [
          "The earth goddess' vengeance will be swift. We ignore her many warnings at our peril.",
          "But those who truly care, not just about Alberta or Canada, but the whole of humanity, put the environment's future ahead of short-term gain from resource extraction.",
          "Our order works to remind people that only collective action will solve global emissions problems. Every nation has to work together.",
          [["But what about the economy?",13],["I have an idea",10]]
        ],
        0, 0, 6
      ],
      [ //7 => knowledge of Edmonton
        [
          "Sir Sparkly-Hair himself is no better a friend. He, too, has stabbed group like ours in the back in order to get to the top.",
          "Even though the two appear to be enemies now that Trans Mountain is delayed, it's all bluster.",
          "They have no choice but to work together behind the scenes. I know how these ELITES in their backrooms work."
        ],
        0,0,8,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Gabby"), false);
        }
      ],
      [ //8 
        [
          "Elites, amiright? Gaia ought to take them all down!",
          "Yeah...Yeah! The whole system's got to go!",
          [["The UCP has a plan",9],["I have an idea",10]] 
        ],
        1,1,8
      ],
      [ //9 => UCP has a plan
        [
          "I hear the UCP has, uh... a PLAN to make our politicans more...uh, accountable...",
          "Ha ha ha ha ha ha ha! You mean to the oil executives!",
        ],
        1,1,14,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Gabby"), false);
        }
      ],
      [ //10 => I have an idea
        [
          "I bet Gaia would like nothing more than to harm the political fortunes of Queen Notley and Emperor Trudeau.",
          "Yeah? Of course She would!",
          "If we take a picture of the two of them palling around together on stage there it will prove to Albertans how much in cahoots the two are.",
          "Hmm. I've got my phone here. How do you know Emperor Trudeau is around?",
          "He'll be here. He can't resist the smell of adulation."
        ],
        1, 0, 23,
        () => {
          //engage trudea-notley cutscene
          this.f.edmonton_trudeauNotleyCutscene();
        }
      ],
      [ //11 => city's weaknesses
        [
          "Huh? Are you...from Calgary? You don't look it but I don't like where this is headed.",
          "Go talk to the Edmonton's resident wise woman, Senator Paula Simons",
          "She's pro-pipeline and I don't trust anyone who'd take a federal appointment, but she knows stuff.",
          "And if you're up to something funny she'll take no guff from you."
        ],
        0, 0, 1,
        () => {
          this.f.edmonton_setPaulaQuestNode();
        }
      ],
      [ //12 => city's greatness
        [
          "Well, to that I say just spend a little time in Calgary and you'll understand!",
          "But seriously, that's a question Edmonton's resident wise woman, Paula Simons, can answer. You'll find her at her Senator's office.",
          "Though she's pro-pipeline and I don't trust anyone who'd take a federal appointment, however, she knows stuff."
        ],
        0, 0, 1,
        () => {
          this.f.edmonton_setPaulaQuestNode();
        }
      ],
      [ //13 => what about economy?
        [
          "Without a healthy environment we risk having no economy to fight for at all. Priorities, man!",
          "I question the precise degree to which there are anthropogenic causes of climate change. We need to consider the range of perspectives on the subject.",
          "That's exactly what groups like our order is doing--",
          "THINK OF EVERYDAY ALBERTANS' JOBS! If we get it wrong, it will do incalculable damage to ordinary peoples' welfare.",
          "But so will environmental dam--",
          "And -- *chuckle* -- newsflash! The climate's been changing since the beginning of time!"
        ],
        1,0,19,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Gabby"), false);
        }
      ],
      [ //14 => go on, you're killing me
        [
          "Go on. You're killing me! Between Notley and that slimeball Jason Kenney, I'll take the devil I know, thanks very much.",
          [["We're not THAT bad!",15],["Um...Good point",16]]
        ],
        0,0,14
      ],
      [ //15 => we're not that bad
        [
          "Leftists consistently fail to appreciate how the Hand's cosmic wisdom benefits them!",
          "Ah ha! Another pro-pipeline operative trying to infiltrate our order. Go back to the hole you crawled out of."
        ],
        1,1,15,
        () => {
          var companion = this.game.actions.getCompanion();
          companion.data.dI = 13;
          this.game.dialogue.initDialogue(null, companion, false);
        }
      ],
      [ //16 => good point
        [
          "Seriously, the only political leaders I trust are the ones working within the system to burn it all to the ground.",
          "Queen Notley and Emperor Trudeau have proven once again that you can't back anyone trying to work from the centre."
        ],
        0, 0, 17,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Gabby"), false);
        }
      ],
      [ //17
        [
          "We're a lot alike. I, too, shun compromise with my enemies.",
          "I know! It would be treasonous to the cause when so much is on the line."
        ],
        1,1,18,
        () => {
          this.game.score("enviroNoCompromise",1);
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Gabby"), false);
        } 
      ],
      [ //18
        [
          "I have to constantly remind myself of my radical roots, especially when listening to the province's pro-pipeline advocates.",
          "The independent Senator Paula Simons is the worst. She's so darned REASONABLE and her knowledge of Edmonton is legendary.",
          "I tell ya, if you were trying to exploit the inner workings of the city to achieve your own nefarious ends, Paula's the one who'd know how to do it.",
          "Anyway, enough chit chat. I've got to get back to demonstrating."
        ],
        0,0,1,
        () => {
          this.f.edmonton_setPaulaQuestNode();
        }
      ],
      [ //19 => climate change argument cont'd
        [
          "This isn't about the beginning of time, this is about human-influenced climate change from CO2 emissions that have the potential to make the planet uninhabitable for us!",
          [["*Respond deferentially*",20],["*Respond belligerently*",21]]
        ],
        0,0,19
      ],
      [ //20 => respond deferentially
        [
          "Um...*cough*...I, uh, hear what you're saying. I will not argue with you further.",
          "Hey, I welcome argument. Just come to the showdown armed with reasonable talking points rather than regurgitated one-liners from the Edmonton Sun."
        ],
        1,1,22,
        () => {
          this.game.score("enviroDeferential",-1);
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Gabby"), false);
        }
      ],
      [ //21 => respond belligerently
        [
          "CO2 is not pollution! Life would cease to exist without it. Our forests breathe it!",
          "Of course, but not in unchecked volumes.",
          "You need to have more faith in the market to generate solutions. Can I interest you in some literature on the subjects? Adam Smith, perhaps?",
          "What are you? Some kind of politician? Get out of here.",
          "Ha ha. 'Some kind' indeed!",
          "You know, you're as infuriating to talk to as Paula Simons, resident Edmonton expert. You two would hit it off."
        ],
        1, 1, 1,
        () => {
          this.game.score("enviroBelligerent",1);
          this.f.edmonton_setPaulaQuestNode();
        }
      ],
      [ //22 
        [
          "My final suggestion to you is, if you're looking for info on Edmonton, talk to Senator Paula Simons. She's a font of knowledge on the city."
        ],
        0,0,23,
        () => {
          this.f.edmonton_setPaulaQuestNode();
        }
      ],
      [ //23
        [
          "Ha! Got 'em! Sending this out to all my social feeds now...'",
          "Ha ha! *Rubbing hands* Proof of Queen Notley's close relationship to Emperor Trudeau will only strengthen my case before Albertans that she's working more in his interests than their's"
        ],
        1,0,24,
        () => {
          // go to companion
          this.game.score("notleyTrudeauPhoto",2);
          var companion = this.game.actions.getCompanion();
          companion.data.dI = 15;
          this.game.dialogue.initDialogue(null,companion,false);
        }
      ],
      [ //24
        [
          "What are you two being all shifty and conniving about?",
          "Uh, celebrating our achievement in the name of Karl Marx, comrade!",
          "You guys realise..."
        ],
        1,0,25,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Gabby"), false);
        }
      ],
      [ //25
        [
          "Nevermind.",
          "Hey, if you're looking for info on Edmonton, the person to talk to is Senator Paula Simons. She's a fountain of knowledge on the city."
        ],
        0,0,1,
        () => {
          this.f.edmonton_setPaulaQuestNode();
        }
      ]
    ],

    "Farmer's Market Vendor" : [
      [ //0
        [ 
          "Get your locally-sourced, GMO-free meat here! Grown and cured right here in 'berta.",
          "Farmers markets are the future!"
        ],
        0,0,0
      ],
      [ //1
        [
          "Get your locally-sourced, GMO-free meat here! Grown and cured right here in 'berta.",
          "Have you any bacon?",
          "Why, yes, sir! Here you are."
        ],
        1,0,2,
        () => {
          this.f.avocadoToast_acquireBacon();
        }
      ],
      [ //2
        [
          "Humans are carnivores and that's a fact."
        ],
        0,0,0
      ]
    ],
    "Clare" : [
      [ //0
        [
          "Welcome to the Imperial Office of the Senate's Edmonton office!"
        ],
        0,0,0
      ],
      [ //1 => offers player oilers jersey
        [
          "I'm sorry. I overheard you both talking...",
          "There's an old, moldy Oilers jersey that the last person to have this desk left behind.",
          "It smells horrible, but it's yours if you want it."
        ],
        0,0,2,
        ()=>{
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Paula Simons"),false);
        }
      ],
      [ //2
        ["Unwashed sports equipment is the stuff of nightmares."],
        0,0,2
      ],
    ],
    "Noah" : [
      [ //0
        [
          "Ain't no libs gettin' between me and this here well.",
          "They're crawlin' through this city. In the LRT line, the sewers, the steam tunnels 'neath the ledge'",
          "...LIBS!"
        ],
        0,0,1
      ],
      [ //1
        [
          "No one comes in, no one comes out."
        ],
        0, 0, 1
      ],
      [ //2
        [
          "Hunh. A lib. I don't talk to the likes of you.",
          "My good man! There are leftists whom you revile offering you a free Oilers jersey in their office over yonder. Might you be interested?",
          "Hmmph. The liberal media finally showing Noah some respect? I suppose I ought to. They owe it to me."
        ],
        1,0,3,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Noah"), false);
        }
      ],
      [ //3
        [
          "I'm going to temporarily step away. DO NOT go down the well!"
        ],
        0,0,3,
        () => {
          this.f.edmonton_createWellEntrance();
        }
      ],
      [ //4
        [
          "Good day, cranky citizen!",
          "Harrumph. Another liberal spouting 'irony.'",
          "*Whispering* I - AM - HERE - FROM - THE - UNITED - CONSERVATIVE - PARTY.",
          "You don't say?",
          "WHAT - CAN - YOU - TELL - ME - ABOUT - GETTING - INSIDE - THE - NDP'S - PALACE?",
          "Say no more, friend! This here well leads directly into their palace. But it's crawling with socialists, like this entire town."
        ],
        1,1,5,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Noah"), false);
        }
      ],
      [ //5
        [
          "Tell you what: I'm going to step away from this here well and if you happen to climb inside, I won't have seen a thing.",
          "Thank you, sir. Glory to the Hand!",
          "Oh, my! Yes! The Hand!"
        ],
        1,0,5,
        () => {
          this.f.edmonton_createWellEntrance();
        }
      ],
      [ //6
        [
          "Only the liberal media puts THAT hotsauce on their food. Go talk to THEM."
        ],
        0,0,6
      ]
    ],
    "Jayshri" : [
      [ //0
        [
          "The UCP can take its plans for two-tier healthcare and shove it up its ideological rear."
        ],
        0,0,0
      ],
      [ //1
        [
          "I understand they LOVE hot sauce over at the Senator's office."
        ],
        0,0,2
      ],
      [//2
        [
          "I heard birds a-twitterin' over by that environmental demonstration earlier.",
          "Birds lay eggs, in case you were curious."
        ],
        0,0,1
      ]
    ],
    "Bill" : [
      [ //0
        [
          "Hey hey! Ho ho! Rachel Notley's got to go!",
          "...and make room for another, truly progressive leader!"
        ],
        0,0,1
      ],
      [ //1
        [
          "Let's be real: they're called the 'tar sands.'"
        ],
        0,0,2
      ],
      [ //2
        [
          "Queen Notley sold her soul to the energy industry!"
        ],
        0, 0, 0
      ],
      [ //3
        [
          "I'm just taking a break from demonstrating to admire the beautiful young bird family in the tree before me.",
          "Humanity on the whole fails to value Nature the way it ought to be."
        ],
        0,0,3
      ],
      [ //4
        [
          "Huh. The mama bird in that nest over there's returned and she looks sad."
        ],
        0,0,4
      ]
    ],

    "Tommy Douglas" : [
      [ //0
        [
          "Queen Notley! The Ethereal Council of Progressives has sent me to offer you guidance.",
          "In my lifetime I did great things. This nation's wise and venerable broadcaster even bestowed on me the title of 'Greatest Canadian' as testament.",
          "And though I led this continent's first socialist government, many forget I also served on the board of directors of an oil company. So I've got your back."
        ],
        0,0,2,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Tommy Douglas"),false)
      ],
      [//1
        [
          "This is a joyous day. The mice of Mouseland have risen up against the fat cats, proving, once again, that the little fellow with an idea is a force to watch out for."
        ],
        0,0,1,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Margaret Thatcher'),false,null,true)
      ],
      [ //2
        [
          "Tommy Douglas! It is an honour that you should grant me your council."
        ],
        0,1,3,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Tommy Douglas"),false)
      ],
      [ //3
        [
          "I've said it before and I'll say it again to you, Rachel:",
          "I firmly believe it's possible to build a society in which there will be full employment, a higher standard of living and an improved quality of life, while at the same time maintaining a reasonable stability in the cost of living.",
          "We don't have to choose between unemployment and inflation.",
          "In Canada we have the resources, the technical know-how, and the industrious people who could make this a great land if we were prepared to bring these various factors together in building a planned economy dedicated to meeting human needs and responding to human wants."
        ],
        0,0,4,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Tommy Douglas"),false)
      ],
      [ //4
        [
          "Truer words have never been spoken. May Albertans remember them as we rush headlong into open war with the UCP."
        ],
        0,1,5
      ],
      [ //5
        [
          "In Canada we have the resources, the technical know-how, and the industrious people who could make this a great land if we were prepared to bring these various factors together in building a planned economy dedicated to meeting human needs and responding to human wants."
        ],
        0,0,5
      ]
    ],

    "Stephen Mandel" : [
      [//0
        [
          "Albertans! The power within the crystals has revealed itself to be ME, Stephen Mandel, leader of the Alberta Party.",
          "With the union of the crystals, aided by the warring of the realm's two biggest parties, I am returned to earth. My prolonged period of silence is ended!",
          "The Alberta Party promises a return to the days when hands extended graciously across the Legislature's aisle.",
          "We'll return government to one that's for everyone. One that governs from the middle because our party believes in pursuing its social AND fiscal responsibilities in equal measure."
        ],
        0,0,1,
        () =>{
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Rachel Notley"),false)
        }
      ],
      [ //1 
          [
            "Certainly not Albertans, Sir Kenney! Now, let's raise a glass to a cooperative, common sense government!",
            "To the wisdom of Albertans for choosing leadership that unequivocally combats bigotry while championing fiscal responsibility!"
          ],
          0,0,2,
          () => this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Rachel Notley"), false)
      ],
      [ //2
        [
          "Consider what you get when you blend the two together in equal parts?",
          "Why, rose of course! It's the diluted flavour of compromise!"
        ],
        0,0,3,
        () => this.f.end_centrist_victory_harperAppears()
      ],
      [ //3
        [
          "It is indeed the work of Lady Destiny!"
        ],
        0,0,4,
        () => this.f.end_centrist_victory_callDeities()
      ],
      [ //4
        [
          "Oh, but just you wait, esteemed-but-mistaken deities of conservatism.",
          "Destiny has chosen us the Alberta Party to lead this great province. A new day is upon us!",
          "Now, let's raise our glasses together:",
          "To the middle! May you forever be mushy!"
        ],
        0,0,5,
        () => this.f.end_centrist_victory_callCurtain()
      ]
    ],

    "K.d. Lang" : [
      [ //0 id: 65
        [
          "*Chuckle* Well, friends, we've had a lot of fun playing Kenney's Quest, haven't we?",
          "I just wanted to cap this little adventure off by honouring Queen Notley for her persistance in making Alberta a more inclusive place to live and thrive."
        ],
        0,0,1,
        () => {
          this.game.actions.jump(this.game.player,210,40,() => {
            this.game.actions.jump(this.game.player,210,300,() => {
              this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("K.d. Lang"),true);
            });
          });
        }
      ],
      [ //1
        [
          "I held a pancake breakfast!",
          "Yeah, alright there, Jason."
        ],
        1,1,2,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("K.d. Lang"),false,null,true)
      ],
      [ //2
        [
          "Friends, whether you were playing in a coffee shop, on the shop floor or in a boardroom, Queen Notley's government has your back.",
          "Until next time: good night, everybody!"
        ],
        0,0,2,
        () => this.f.end_ndp_victory_curtainFalls()
      ]
    ],

    "Jagmeet Singh" : [
      [ //0
        [
          "Love and courage, comrade Notley! I'm so happy you had time for me.",
          [ ["Solidarity, Grand Commissar.",1],["Love and courage, Grand Commissar.",2] ]
        ],
        0,0,0
      ],
      [ //1 => solidarity
        [
          "Solidarity, Grand Commissar. However, you have a funny way of showing it yourself. Your public statements on the matter of Alberta's pipelines suggest just the opposite.",
          "Hey, now! You know where I stand on the pipelines. Where I HAVE to stand as leader of a federal party broadly opposed to them.",
          "Which you only gauged after keeping quiet on them for so long. You make an art of opportunism, and a mockery of solidarity, Commissar."
        ],
        1,1,3,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Jagmeet Singh'),false);
        }
      ],
      [ //2 => love and courage
        [
          "Love and Courage, Grand Commissar Singh. Although your public statements on the matter of Alberta's pipelines suggest just the opposite.",
          "Hey, now! You know where I stand on the pipelines. Where I HAVE to stand as leader of a federal party broadly opposed to them.",
          "Which you only gauged after keeping quiet on them for so long. You make an art of opportunism, and a mockery of solidarity, Commissar."
        ],
        1, 1, 3,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Jagmeet Singh'),false);
        }
      ],
      [ //3
        [
          "But as a compassionate queen, I forgive you for waiting until the political winds had shown you what your principles are.",
          "Listen, you and I need to work together. I hear rumblings of your Alberta NDP breaking with the rest of the party."
        ],
        1,1,4,
        () => {
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Jagmeet Singh'),false)
        }
      ],
      [ //4
        [
          "You know an independent progressive Albertan government would be foolhardy, right?", 
          "We have a legacy as NDPers. Mouseland! The Cooperative Commonwealth Federation! Jack Layton's moustache! They all represent something bigger than you or I.",
          [ ["I know of no such plans.",5],["It's been discussed.",6] ]
        ],  
        0,0,5
      ],
      [ //5 => i know of no such plans
        [
          "Rumours in the media, I'm sure. The Alberta NDP is as aligned as ever to the goals of the rest of the party. We defend working families.",
          "Does social justice not mean fair, dignified work for everyone? And does that not mean the pipeline's construction is a legitimate endeavour according to our party's principles?"
        ],
        0,1,7,
        () => {
          this.game.score("jagmeetNoSuchPlans",1)
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter("Jagmeet Singh"),false)
        }
      ],
      [ //6 => it's been discussed
        [
          "Not in any serious way. But the rumours have been helpful.",
          "Queen Notley, the NDP is embattled on all levels. Right-wing ethno-nationalism is resurgent globally. Solidarity! "
        ],
        1,1,8,
        () => {
          this.game.score("jagmeetNoSuchPlans",-1)
          this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Jagmeet Singh'),false)
        }
      ],
      [ //7
        [
          "Comrade Notley, you and I both know that can't come at the cost of our ideals.",
          "What about at the cost of actually getting elected?",
          "Come now. That's not the NDP way! Solidarity!"
        ],
        1,0,8,
        () => this.game.dialogue.initDialogue(null,this.game.actions.getCharacter('Jagmeet Singh'),false)
      ],
      [ //8
        [
          "Solidarity means supporting your NDP governments in power, not placing their leaders' heads on the chopping block.",
          "Albertans are asking what the point of supporting me is when I can't get the leader of my own federal party to support me!"
        ],
        0,1,9,
        () => {
          this.game.dialogue.initDialogue(null, this.game.actions.getCharacter("Jagmeet Singh"), false)
        }
      ],
      [ //9
        [
          "Look, I understand your predicament. But for the rest of the party, I'm asking you to go along to get along.",
          "Here, I've invited John Horgan here so you two can bury the hatchet and we can move forward together as one party."
        ],
        0,0,10,
        () => {
          this.f.ndp_palace_02_horganEnters();
        }
      ],
      [ //10 return from horgan enter
        [
          "Ok, comrades. Shake hands and agree to Jag-meet one another halfway. C'mon!",
          [ ["Shake hands.",11],["Refuse.",12] ]
        ],
        0,0,0
      ],
      [ //11 => shake hands
        [
          "Very well. I recognize that concessions with one another are required..."
        ],
        0,1,13,
        () => {
          var horgan = this.game.actions.getCharacter("John Horgan");
          horgan.data.dI = 22;
          this.game.dialogue.initDialogue(null,horgan,false);
        }
      ],
      [ //12 => refuse
        [
          "No."
        ],
        0, 1, 14,
        () => {
          var horgan = this.game.actions.getCharacter("John Horgan");
          horgan.data.dI = 20;
          this.game.dialogue.initDialogue(null,horgan,false);
        }
      ],
      [ //13
        [
          "SO glad we were able to have this discussion!",
          "Later I want to talk about you being a queen. You know how I feel about abolishing the monarchy, right?"
        ],
        0,0,13
      ],
      [ //14
        [
          "I realise I can't force you to do anything, but I encourage you to think of the whole of the NDP, not just its parts."
        ],
        0,0,14
      ],
      [ //15
        [
          "Comrade Notley! Comrade Notley!",
          "*Pant* Uh, huh huh. Hooiee. Hi! I've been waiting to meet with you.",
          [ ["Solidarity, Grand Commissar.",1],["Love and courage, Grand Commissar.",2] ]
        ],
        0,0,15
      ]

    ]
  }
  }

  
};