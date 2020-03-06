import matplotlib.pyplot as plt
import numpy as np

plt.ion()

y = np.random.random([10,1])
plt.plot(y)
plt.draw()
plt.pause(2)
plt.clf()


y = np.random.random([10,1])
plt.plot(y)
plt.pause(2)
plt.ioff()

plt.show(block=True)

