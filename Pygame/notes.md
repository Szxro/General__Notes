# Pygame Basics

### Setting up pygame

```py
# install pygame (pip install pygame --pre)
import pygame,sys

# initialization of pygame
pygame.init()

# setting the fps
clock = pygame.time.Clock()

# setting the window size
screen_size = (200,200) # w,h

# set the window size to pygame
screen = pygame.display.set_mode(screen_size)

while True:
    # get all the event (Mouse,Keyboard,etc...)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit() # stop pygame
            sys.exit()# stop script and quit

 pygame.display.update() # to update the screen
 clock.tick(60) # setting the max fps of the game
```

> pip just search for stable version and compatible with the actual python for pre-release --pre

> Games runs in a loop (While True)

> Python is syncronous it run one line a time

### Creating Surface (Image,Color,Text) and putting in the screen

```py

# Font Surface
game_font = pygame.font.Font(None,50) #font_style,font_size
# None is the default font of pygame

# creating a surface for the font
main_surface = game_font.render("This is a Text",False,"Red") # (text,AA,Color) AA = AntiAliasing
# this surface can be put in the screen

# Image Surface
image_surface = pygame.image.load("image_path").convert()

# Color Surface
color_surface = pygame.Surface((100,100)) # w,h
color_surface.fill("Color")


screen.blit(main_surface,(0,0)) # (surface,coordinates / tuples | array)
screen.blit(image_surface,(0,100))

# The position of the surface can affect how it see
```

> The coordinates work similar to the positioning in css if you put in x = 100 is going to move away from the right, the same in y

> The coordinates (0,0) is in the top left

### Getting the Input from the loop

```py
# In the event loop
if event.type == pygame.KEYDOWN:
    if event.key == pygame.K_RIGHT: # Key Right ->
        print("RIGHT")
    if event.key == pygame.K_UP:
        print("UP")
    if event.key == pygame.K_LEFT:
        print("LEFT")
    if event.key == pygame.K_DOWN:
        player_position[0] += 10 # its going to move the player in x 10 px/sec

# KeyDown = the key is press
```

> With this can put an array of coordinates [0,0] and when the user press a specify key is going to sum the variable itself + a number , it will move the image

> When the image is moving is changing position it will recreate the same image in the new position
