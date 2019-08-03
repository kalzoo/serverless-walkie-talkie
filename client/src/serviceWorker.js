"use strict";
// This optional code is used to register a service worker.
// register() is not called by default.
Object.defineProperty(exports, "__esModule", { value: true });
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return;
        }
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
            if (isLocalhost) {
                // This is running on localhost. Let's check if a service worker still exists or not.
                checkValidServiceWorker(swUrl, config);
                // Add some additional logging to localhost, pointing developers to the
                // service worker/PWA documentation.
                navigator.serviceWorker.ready.then(() => {
                    console.log('This web app is being served cache-first by a service ' +
                        'worker. To learn more, visit https://bit.ly/CRA-PWA');
                });
            }
            else {
                // Is not localhost. Just register service worker
                registerValidSW(swUrl, config);
            }
        });
    }
}
exports.register = register;
function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
        registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
                return;
            }
            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        // At this point, the updated precached content has been fetched,
                        // but the previous service worker will still serve the older
                        // content until all client tabs are closed.
                        console.log('New content is available and will be used when all ' +
                            'tabs for this page are closed. See https://bit.ly/CRA-PWA.');
                        // Execute callback
                        if (config && config.onUpdate) {
                            config.onUpdate(registration);
                        }
                    }
                    else {
                        // At this point, everything has been precached.
                        // It's the perfect time to display a
                        // "Content is cached for offline use." message.
                        console.log('Content is cached for offline use.');
                        // Execute callback
                        if (config && config.onSuccess) {
                            config.onSuccess(registration);
                        }
                    }
                }
            };
        };
    })
        .catch(error => {
        console.error('Error during service worker registration:', error);
    });
}
function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl)
        .then(response => {
        // Ensure service worker exists, and that we really are getting a JS file.
        const contentType = response.headers.get('content-type');
        if (response.status === 404 ||
            (contentType != null && contentType.indexOf('javascript') === -1)) {
            // No service worker found. Probably a different app. Reload the page.
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister().then(() => {
                    window.location.reload();
                });
            });
        }
        else {
            // Service worker found. Proceed as normal.
            registerValidSW(swUrl, config);
        }
    })
        .catch(() => {
        console.log('No internet connection found. App is running in offline mode.');
    });
}
function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
exports.unregister = unregister;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZVdvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZpY2VXb3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJEQUEyRDtBQUMzRCx1Q0FBdUM7O0FBRXZDLDhFQUE4RTtBQUM5RSw4RUFBOEU7QUFDOUUsK0VBQStFO0FBQy9FLDJFQUEyRTtBQUMzRSwyQ0FBMkM7QUFFM0MsNEVBQTRFO0FBQzVFLHNDQUFzQztBQUV0QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFdBQVc7SUFDdEMsdUNBQXVDO0lBQ3ZDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLE9BQU87SUFDcEMsZ0RBQWdEO0lBQ2hELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FDNUIsd0RBQXdELENBQ3pELENBQ0osQ0FBQztBQU9GLFNBQWdCLFFBQVEsQ0FBQyxNQUFlO0lBQ3RDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxJQUFJLGVBQWUsSUFBSSxTQUFTLEVBQUU7UUFDekUsb0VBQW9FO1FBQ3BFLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUN0QixPQUE4QyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQzlELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNyQixDQUFDO1FBQ0YsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQy9DLHVFQUF1RTtZQUN2RSx5RUFBeUU7WUFDekUsNkVBQTZFO1lBQzdFLE9BQU87U0FDUjtRQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO1lBQ25DLE1BQU0sS0FBSyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLG9CQUFvQixDQUFDO1lBRTVELElBQUksV0FBVyxFQUFFO2dCQUNmLHFG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O1lBQ0wsMkNBQTJDO1lBQzNDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FDVCwrREFBK0QsQ0FDaEUsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELFNBQWdCLFVBQVU7SUFDeEIsSUFBSSxlQUFlLElBQUksU0FBUyxFQUFFO1FBQ2hDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNoRCxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUM7QUFORCxnQ0FNQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgb3B0aW9uYWwgY29kZSBpcyB1c2VkIHRvIHJlZ2lzdGVyIGEgc2VydmljZSB3b3JrZXIuXG4vLyByZWdpc3RlcigpIGlzIG5vdCBjYWxsZWQgYnkgZGVmYXVsdC5cblxuLy8gVGhpcyBsZXRzIHRoZSBhcHAgbG9hZCBmYXN0ZXIgb24gc3Vic2VxdWVudCB2aXNpdHMgaW4gcHJvZHVjdGlvbiwgYW5kIGdpdmVzXG4vLyBpdCBvZmZsaW5lIGNhcGFiaWxpdGllcy4gSG93ZXZlciwgaXQgYWxzbyBtZWFucyB0aGF0IGRldmVsb3BlcnMgKGFuZCB1c2Vycylcbi8vIHdpbGwgb25seSBzZWUgZGVwbG95ZWQgdXBkYXRlcyBvbiBzdWJzZXF1ZW50IHZpc2l0cyB0byBhIHBhZ2UsIGFmdGVyIGFsbCB0aGVcbi8vIGV4aXN0aW5nIHRhYnMgb3BlbiBvbiB0aGUgcGFnZSBoYXZlIGJlZW4gY2xvc2VkLCBzaW5jZSBwcmV2aW91c2x5IGNhY2hlZFxuLy8gcmVzb3VyY2VzIGFyZSB1cGRhdGVkIGluIHRoZSBiYWNrZ3JvdW5kLlxuXG4vLyBUbyBsZWFybiBtb3JlIGFib3V0IHRoZSBiZW5lZml0cyBvZiB0aGlzIG1vZGVsIGFuZCBpbnN0cnVjdGlvbnMgb24gaG93IHRvXG4vLyBvcHQtaW4sIHJlYWQgaHR0cHM6Ly9iaXQubHkvQ1JBLVBXQVxuXG5jb25zdCBpc0xvY2FsaG9zdCA9IEJvb2xlYW4oXG4gIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCcgfHxcbiAgICAvLyBbOjoxXSBpcyB0aGUgSVB2NiBsb2NhbGhvc3QgYWRkcmVzcy5cbiAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09ICdbOjoxXScgfHxcbiAgICAvLyAxMjcuMC4wLjEvOCBpcyBjb25zaWRlcmVkIGxvY2FsaG9zdCBmb3IgSVB2NC5cbiAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUubWF0Y2goXG4gICAgICAvXjEyNyg/OlxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPykpezN9JC9cbiAgICApXG4pO1xuXG50eXBlIENvbmZpZyA9IHtcbiAgb25TdWNjZXNzPzogKHJlZ2lzdHJhdGlvbjogU2VydmljZVdvcmtlclJlZ2lzdHJhdGlvbikgPT4gdm9pZDtcbiAgb25VcGRhdGU/OiAocmVnaXN0cmF0aW9uOiBTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKGNvbmZpZz86IENvbmZpZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyAmJiAnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gICAgLy8gVGhlIFVSTCBjb25zdHJ1Y3RvciBpcyBhdmFpbGFibGUgaW4gYWxsIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBTVy5cbiAgICBjb25zdCBwdWJsaWNVcmwgPSBuZXcgVVJMKFxuICAgICAgKHByb2Nlc3MgYXMgeyBlbnY6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfSkuZW52LlBVQkxJQ19VUkwsXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICk7XG4gICAgaWYgKHB1YmxpY1VybC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcbiAgICAgIC8vIE91ciBzZXJ2aWNlIHdvcmtlciB3b24ndCB3b3JrIGlmIFBVQkxJQ19VUkwgaXMgb24gYSBkaWZmZXJlbnQgb3JpZ2luXG4gICAgICAvLyBmcm9tIHdoYXQgb3VyIHBhZ2UgaXMgc2VydmVkIG9uLiBUaGlzIG1pZ2h0IGhhcHBlbiBpZiBhIENETiBpcyB1c2VkIHRvXG4gICAgICAvLyBzZXJ2ZSBhc3NldHM7IHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svY3JlYXRlLXJlYWN0LWFwcC9pc3N1ZXMvMjM3NFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3dVcmwgPSBgJHtwcm9jZXNzLmVudi5QVUJMSUNfVVJMfS9zZXJ2aWNlLXdvcmtlci5qc2A7XG5cbiAgICAgIGlmIChpc0xvY2FsaG9zdCkge1xuICAgICAgICAvLyBUaGlzIGlzIHJ1bm5pbmcgb24gbG9jYWxob3N0LiBMZXQncyBjaGVjayBpZiBhIHNlcnZpY2Ugd29ya2VyIHN0aWxsIGV4aXN0cyBvciBub3QuXG4gICAgICAgIGNoZWNrVmFsaWRTZXJ2aWNlV29ya2VyKHN3VXJsLCBjb25maWcpO1xuXG4gICAgICAgIC8vIEFkZCBzb21lIGFkZGl0aW9uYWwgbG9nZ2luZyB0byBsb2NhbGhvc3QsIHBvaW50aW5nIGRldmVsb3BlcnMgdG8gdGhlXG4gICAgICAgIC8vIHNlcnZpY2Ugd29ya2VyL1BXQSBkb2N1bWVudGF0aW9uLlxuICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICdUaGlzIHdlYiBhcHAgaXMgYmVpbmcgc2VydmVkIGNhY2hlLWZpcnN0IGJ5IGEgc2VydmljZSAnICtcbiAgICAgICAgICAgICAgJ3dvcmtlci4gVG8gbGVhcm4gbW9yZSwgdmlzaXQgaHR0cHM6Ly9iaXQubHkvQ1JBLVBXQSdcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElzIG5vdCBsb2NhbGhvc3QuIEp1c3QgcmVnaXN0ZXIgc2VydmljZSB3b3JrZXJcbiAgICAgICAgcmVnaXN0ZXJWYWxpZFNXKHN3VXJsLCBjb25maWcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyVmFsaWRTVyhzd1VybDogc3RyaW5nLCBjb25maWc/OiBDb25maWcpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXJcbiAgICAucmVnaXN0ZXIoc3dVcmwpXG4gICAgLnRoZW4ocmVnaXN0cmF0aW9uID0+IHtcbiAgICAgIHJlZ2lzdHJhdGlvbi5vbnVwZGF0ZWZvdW5kID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnN0YWxsaW5nV29ya2VyID0gcmVnaXN0cmF0aW9uLmluc3RhbGxpbmc7XG4gICAgICAgIGlmIChpbnN0YWxsaW5nV29ya2VyID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFsbGluZ1dvcmtlci5vbnN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgIGlmIChpbnN0YWxsaW5nV29ya2VyLnN0YXRlID09PSAnaW5zdGFsbGVkJykge1xuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIHVwZGF0ZWQgcHJlY2FjaGVkIGNvbnRlbnQgaGFzIGJlZW4gZmV0Y2hlZCxcbiAgICAgICAgICAgICAgLy8gYnV0IHRoZSBwcmV2aW91cyBzZXJ2aWNlIHdvcmtlciB3aWxsIHN0aWxsIHNlcnZlIHRoZSBvbGRlclxuICAgICAgICAgICAgICAvLyBjb250ZW50IHVudGlsIGFsbCBjbGllbnQgdGFicyBhcmUgY2xvc2VkLlxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAnTmV3IGNvbnRlbnQgaXMgYXZhaWxhYmxlIGFuZCB3aWxsIGJlIHVzZWQgd2hlbiBhbGwgJyArXG4gICAgICAgICAgICAgICAgICAndGFicyBmb3IgdGhpcyBwYWdlIGFyZSBjbG9zZWQuIFNlZSBodHRwczovL2JpdC5seS9DUkEtUFdBLidcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAvLyBFeGVjdXRlIGNhbGxiYWNrXG4gICAgICAgICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLm9uVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLm9uVXBkYXRlKHJlZ2lzdHJhdGlvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQsIGV2ZXJ5dGhpbmcgaGFzIGJlZW4gcHJlY2FjaGVkLlxuICAgICAgICAgICAgICAvLyBJdCdzIHRoZSBwZXJmZWN0IHRpbWUgdG8gZGlzcGxheSBhXG4gICAgICAgICAgICAgIC8vIFwiQ29udGVudCBpcyBjYWNoZWQgZm9yIG9mZmxpbmUgdXNlLlwiIG1lc3NhZ2UuXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb250ZW50IGlzIGNhY2hlZCBmb3Igb2ZmbGluZSB1c2UuJyk7XG5cbiAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBjYWxsYmFja1xuICAgICAgICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5vblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBjb25maWcub25TdWNjZXNzKHJlZ2lzdHJhdGlvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBzZXJ2aWNlIHdvcmtlciByZWdpc3RyYXRpb246JywgZXJyb3IpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja1ZhbGlkU2VydmljZVdvcmtlcihzd1VybDogc3RyaW5nLCBjb25maWc/OiBDb25maWcpIHtcbiAgLy8gQ2hlY2sgaWYgdGhlIHNlcnZpY2Ugd29ya2VyIGNhbiBiZSBmb3VuZC4gSWYgaXQgY2FuJ3QgcmVsb2FkIHRoZSBwYWdlLlxuICBmZXRjaChzd1VybClcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAvLyBFbnN1cmUgc2VydmljZSB3b3JrZXIgZXhpc3RzLCBhbmQgdGhhdCB3ZSByZWFsbHkgYXJlIGdldHRpbmcgYSBKUyBmaWxlLlxuICAgICAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk7XG4gICAgICBpZiAoXG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0IHx8XG4gICAgICAgIChjb250ZW50VHlwZSAhPSBudWxsICYmIGNvbnRlbnRUeXBlLmluZGV4T2YoJ2phdmFzY3JpcHQnKSA9PT0gLTEpXG4gICAgICApIHtcbiAgICAgICAgLy8gTm8gc2VydmljZSB3b3JrZXIgZm91bmQuIFByb2JhYmx5IGEgZGlmZmVyZW50IGFwcC4gUmVsb2FkIHRoZSBwYWdlLlxuICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWFkeS50aGVuKHJlZ2lzdHJhdGlvbiA9PiB7XG4gICAgICAgICAgcmVnaXN0cmF0aW9uLnVucmVnaXN0ZXIoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTZXJ2aWNlIHdvcmtlciBmb3VuZC4gUHJvY2VlZCBhcyBub3JtYWwuXG4gICAgICAgIHJlZ2lzdGVyVmFsaWRTVyhzd1VybCwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgJ05vIGludGVybmV0IGNvbm5lY3Rpb24gZm91bmQuIEFwcCBpcyBydW5uaW5nIGluIG9mZmxpbmUgbW9kZS4nXG4gICAgICApO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5yZWdpc3RlcigpIHtcbiAgaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWFkeS50aGVuKHJlZ2lzdHJhdGlvbiA9PiB7XG4gICAgICByZWdpc3RyYXRpb24udW5yZWdpc3RlcigpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=