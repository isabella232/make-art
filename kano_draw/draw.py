import os

class Draw(object):
    def __init__(self, load_path='', make=False, play=False):
        super(Draw, self).__init__()
        base_url = 'http://localhost:8000/{path}'

        if make:
            url = base_url.format(path='challenges')
        elif play:
            url = base_url.format(path='playground')
        elif load_path:
            path = 'localLoad/{}'.format(load_path.strip('/'))
            url = base_url.format(path=path)
        else:
            url = base_url.format(path='')

        self._index = 'chromium --app={url} --start-fullscreen'.format(url=url)

        self._title = "Art"
        self._app_icon = '/usr/share/icons/Kano/88x88/apps/kano-draw.png'

        self._decoration = False
        self._maximized = True

    def run(self):
        os.system(self._index)

# We require this function for starting the UI as a subprocess
def start_draw(load_path='', make=False, play=False):
    draw_instance = Draw(load_path=load_path, make=make, play=play)
    draw_instance.run()
