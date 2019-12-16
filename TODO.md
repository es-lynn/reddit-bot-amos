TODO:
- Unit Tests
- Deploy

Mostly really happy how this turned out. Took a bit longer than I thought, but I like how re-usable everything is. While the Logger library isn't perfect, but it's close to achiving what I want it to do.
 
Bot:
- Better failure retry rather than resetting all posts.
- Enhancements? 

Logger:
- Debug mode
- All ExpressJS instances should use the same one
- Redo the logging interface...how messages, errors and params are handled should be determined by the interface.
message: { text, error, params }
- Strict immutability
- Prettier ExpressJS logging
- ExpressJS JSON & HTML Logger?
- Print better error messages

RedditAPI:
- Should we wrap all exceptions? I think so.

HTTP:
- Really proud of how you figured out how to do it elegantly but more work still needs to be done
- Handle logging for it better. It should not leak.
- O2A for other flows.
- Strict immutablity

Utils:
- Need a Utility version of my prototypes
- Split them up into Utils & prototypes
- Need a format class for strings, and dates
- Dynamic left/right padder?
